from bs4 import BeautifulSoup
import requests
import json
import re

#scraping select products from the Counter Culture Coffee website
urls = ["https://counterculturecoffee.com/shop/coffee/collection-apollo",
        "https://counterculturecoffee.com/shop/coffee/collection-big-trouble",
        "https://counterculturecoffee.com/shop/coffee/cinco-de-junio",
        "https://counterculturecoffee.com/shop/coffee/decaf-urcunina",
        "https://counterculturecoffee.com/shop/coffee/collection-fast-forward",
        "https://counterculturecoffee.com/shop/coffee/finca-el-puente",
        "https://counterculturecoffee.com/shop/coffee/collection-forty-six",
        "https://counterculturecoffee.com/shop/coffee/collection-gradient",
        "https://counterculturecoffee.com/shop/coffee/collection-hologram",
        "https://counterculturecoffee.com/shop/coffee/perennial-2"
        ]
products = []

for url in urls:
    result = requests.get(url)
    doc = BeautifulSoup(result.text, "html.parser")

    #product name
    name = doc.find(class_="product_title").text

    #product image
    image = "placeholder"

    #product category
    category = "coffee"

    #product brand
    brand = "Counter Culture"

    #product description
    description = doc.find(class_="coffee-story")
    description_p = description.find("p").text

    #product price
    price = doc.find_all(class_="woocommerce-Price-amount")

    #product tasting notes
    tasting_notes_elements = doc.find_all(class_="coffee-tasting-note")

    tasting_notes = []
    for child in tasting_notes_elements:
        tasting_notes.append(re.sub('/|\n', '', child.text))
        
    #product roast level
    roast_agtron = doc.find(class_="roast-num")

    if int(roast_agtron.text) >= 70:
        roast_level = "Light"
    elif int(roast_agtron.text) >= 60:
        roast_level = "Medium-light"
    elif int(roast_agtron.text) >= 50:
        roast_level = "Medium"
    else:
        roast_level = "Dark"

    #product coffee process
    coffee_process_elements = doc.find_all(class_="process-icon selected")

    coffee_process = []
    for child in coffee_process_elements:
        coffee_process.append(re.sub('/|\n', '', child.text))

    #product coffee origin
    coffee_notes = doc.find(class_="coffee-notes")
    coffee_origin = coffee_notes.find("div").text

    #create dict
    product = {
        "name": name,
        "image": image,
        "category": category,
        "brand": brand,
        "description": description_p,
        "price": round(float(re.sub('\$','',price[1].text)), 2),
        "tastingNotes": tasting_notes,
        "roastLevel": roast_level,
        "coffeeProcess": coffee_process,
        "coffeeOrigin": coffee_origin,
        "stock": 100,
        "isFeatured": False
    }

    #add to list of products
    products.append(product)

#cast to JSON
with open('data.json', 'w') as file:
    json.dump(products, file)

