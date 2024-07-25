import requests

url = "https://www.moravianchurcharchives.findbuch.net/pics/X.._Travel%20Journals._~TravJournals_26._~TravJournals_26_{}.jpg"
output_folder = "Bilder/"

def convert_to_alphanumeric(num):
    return str(num - 1000).zfill(3)

def harvest_images(start_num, end_num):
    for i in range(start_num, end_num+1):
        image_url = url.format(i)
        response = requests.get(image_url)
        if response.status_code == 200:
            filename = convert_to_alphanumeric(i) + ".jpg"
            with open(output_folder + filename, "wb") as image_file:
                image_file.write(response.content)
                print("Bild", filename, "erfolgreich gespeichert.")
        else:
            print("Fehler beim Herunterladen des Bildes", str(i) + ".jpg")

start_num = 1001
end_num = 1110

harvest_images(start_num, end_num)