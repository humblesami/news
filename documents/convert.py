import subprocess
from PIL import Image
from fpdf import FPDF
from mainapp import settings
from PyPDF2 import PdfFileReader
from django.core.files import File as DjangoFile

def text_extractor(f):
    pdf = PdfFileReader(f)
    number_of_pages = pdf.numPages
    n = 0
    text = ''
    while n != number_of_pages:
        page = pdf.getPage(n)
        text += page.extractText() + ' '
        n += 1
    return text

def get_pdf(self):
    tmp = self.attachment.url.split('.')
    ext = tmp[len(tmp) - 1]
    filename = self.file_name
    pth = settings.BASE_DIR + self.attachment.url
    if ext in ('odt', 'doc', 'docx', 'ppt', 'pptx', 'pdf'):
        self.doc2pdf(pth, ext, filename)
    elif ext == "xls" or ext == "xlsx":
        self.excel2xhtml(pth, filename)
    elif ext in ['png', 'jpg', 'jpeg']:
        self.img2pdf(pth, filename)
    else:
        raise Exception('Invalid File Type')


def exclude_extension(self, name):
    name = os.path.splitext(name)[0]
    return name


def doc2pdf(self, pth, ext, filename):
    try:
        res_pdf_path = pth.replace("files", "converted")
        res_pdf_path = self.exclude_extension(res_pdf_path) + '.pdf'
        if ext == "pdf":
            res = open(pth, 'rb')
        else:
            subprocess.check_call(
                ['/usr/bin/python3', '/usr/bin/unoconv', '-f', 'pdf',
                 '-o', res_pdf_path, '-d', 'document',
                 pth])
            res = open(res_pdf_path, 'rb')
        if ext != "pdf":
            res = open(res_pdf_path, 'rb')
        else:
            res = open(pth, 'rb')
        if filename.endswith('.pdf'):
            filename = filename + '.pdf'
        self.pdf_doc.save(filename, DjangoFile(res))
    except:
        raise


def excel2xhtml(self, pth, filename):
    try:
        res_pdf_path = pth.replace("files", "converted")
        res_pdf_path = self.exclude_extension(res_pdf_path) + ".xhtml"
        subprocess.check_call(
            ['/usr/bin/python3', '/usr/bin/unoconv', '-f', 'xhtml',
             '-o', res_pdf_path,
             pth]
        )
        res = open(res_pdf_path, 'rb')
        self.pdf_doc.save(filename + ".xhtml", DjangoFile(res))
        read = res.read()
        r = read.decode("utf-8")
        self.html = r
    except:
        raise


def img2pdf(self, pth, filename):
    try:
        res_pdf_path = pth.replace("files", "converted")
        im = Image.open(pth)
        width, height = im.size
        if height >= width:
            orientation = 'P'
            w = 210
            h = 297
        else:
            orientation = 'L'
            w = 297
            h = 210

        pdf = FPDF()
        pdf.add_page(orientation=orientation)
        pdf.image(pth, x=0, y=0, w=w, h=h)
        pdf.output(res_pdf_path, "F")
        res = open(res_pdf_path, 'rb')
        if not filename.endswith('.pdf'):
            filename = filename + '.pdf'
        self.pdf_doc.save(filename, DjangoFile(res))
    except:
        raise
