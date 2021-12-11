# Gift Guide

## Technologies Used

- CSS
- jQuery
- JavaScript
- HTML
- EJS
- NodeJS
- Axios
- Express
- Method-Override
- Uplash Image API

## Screenshots

##### *Gift Guide*
![Gift Guide](/public/images/hp.png "Gift Guide")

##### *Gift Guide Navigation*
![Gift Guide Navigation](/public/images/nav.png "Gift Guide Navigation")

##### *Holiday Navigation*
![Holiday Navigation](/public/images/nav-hol.png "Holiday Navigation")

##### *Recipient Navigation*
![Recipient Navigation](/public/images/nav-rec.png "Recipient Navigation")

##### *Holiday Page*
![Holiday Page](/public/images/hol.png "Holiday Page")

##### *Recipient Page*
![Recipient Page](/public/images/rec.png "Recipient Page")

##### *Recipient Holiday Filter Page*
![Recipient Holiday Filter Page](/public/images/rec-hol.png "Recipient Holiday Filter Page")

##### *Product Display Page*
![Product Display Page](/public/images/pdp.png "Product Display Page")

##### *Edit Product*
![Edit Product](/public/images/edit.png "Edit Product")

##### *New Product*
![New Product](/public/images/new.png "New Product")


## Getting Started

[Gift Guide](https://gift-guide-project.herokuapp.com/)

The holiday gift guide is designed to make it easier and more approachable to keep track of the gifts you have purchsed for any occassion.

1. Navigation - Navigation persists on all pages accross the gift guide. It has an attached 4 functions.
   1. Home - This button will return you to the home page from any location.
   2. Holiday Dropdown - This dropdown is a self-updating dropdown that will display all of the holidays that have been input for any products in the database. It will navigate you to the respective holiday page.
   3. Recipient Dropdown - This dropdown is also self-updating and will show all of the recipients currently in the system. Selecting a recipient will bring you to that recipients page of gifts.
   4. Add New Gifts - This button will bring you to the new page where a gift can be added.

2. Index Pages - The pages are as follows, the core index page, the holiday show page, the recipient show page, and the holiday-recipient show page. Each page serves to help the user with a different layer of filtering. Each show page with the exception of the core index page will also display the total cost of all the gifts associated with it. Additionally, selecting the image of a product will take you to that product's display page, while selecting either the holiday or recipient will redirect you to that recipient or holiday show page respectively.

3. Product Display Pages - By selecting a product by it's image you will be taken to the PDP. This maintains all information about the product and a link that will redirect the user to the product's direct URL. This page also allows you to delete the product entirely or adjust any information.

4. Edit/New Pages - These pages will direct you to a form that can be used to input product information for the gift you are buying. If the user does not wish to put in the actual image URL for the gift they are buying, they are prvodided with the ability to search for an image using the Uplash API. This API will grab images from the Uplash DB and return them for the user. If the user likes the image, using the UPDATE IMAGE URL button will allow the user to automatically input the URL for the image they found into the form.


## Future Enhancements

I would like to add functionality to move through additional images returned from the API. I would also like to add more functionality and filtering for show pages.