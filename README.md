# Project 2 Bootcamp Full Stack- Take a Hike

Node js web application based on MVC, Mysql , and Handlebars.

**Take a Hike**  is a web application using **node.js**, , **MySql** database, **Handlebars** template engine. This site is based on **MVC** design concept of *Model* , *View*, and *Controller* layers. 

**NPM s** used in this project includes : *express* , *passport*, *express-session*, *body-parser*, *express-handlebars*, *sequelize*, *fs* , *axios* . 

**External APIs** 

*Google Geo Code* -Used to return  longitude  and latitude coordinates based on user input values ( city, state, zip) from home page input search box. 

*Hiking Project  Trails api*- Used to return back trails data using input parametes returned from the  *Google Geo Code* api. 

**Basic Concept of  " Take a Hike"  web site** 

*Take a Hike* allows users to get hiking trail information based on user-entered search of any one of zipcode , city or state used to return hiking trail information.  This demo project is just a "MVP" minimum viable product. The functionallity is basic to demonstrate the technology taught in bootcamp class.  There is room to add more functionality to this application. 


**User Registration** 

 ![](signup.JPG)

For user registration and authentication we used passport.js library.  This where we link our library to our database to authorize each user when they login with a username and a password


** Hiker Search main page** 

![](homepage.JPG)

The main page contain the input search box where the user can choose to enter a location  either, zipcode, city, state.  The *search* button then makes an *ajax* call to the backend  *html-route* of the *controller* layer .

 The *html-route*  makes two api external calls using *axios* to  first *Google Geo Code* to return the coordinates in *longitude* and *latitude* which is then use by the *Hiking Project* api to return  hiking trail data to another page for the results under the "\trails" route.

 **Search Results**

 ![](searchResults.JPG)

The *\trails* route is the result of the search from the home page. The template engine *Handlebars* is used to render the trails data returned by the external api calls. There is a  *More Info* link on each result which opens up another tab to the *Hiking Project site*  with more trail information such as maps, weather condition

 ![](moreInfo.JPG)

 **Saving the Hiking Results**

 On the "\trails" page with the rendered search a user can choose to save the specific trail result by clicking on the button *Save This Hike*. 
 
If the user did not sign in the saved search is saved to a  *MySql* table under a default user*  If the user is signed in then the saved trail is saved with the user id attached to the saved hike record. 

**Recent Searches**
 
 ![](savedSearch.JPG)

The top navigation bar has "Recent Searches" link  to "/savedsearches" route.  This returned all saved searches. For the purpose of this project we did not  limit it by user . 


**API Routes**

We included in this project API Routes to render *JSON* objects.
"/api/user" renders registered users. This is just to demonstrate api route. Any real world site would not expose this to users. 

 ![](userAPI.JPG)

 "/api/favehikes"  returns the result of all the saved hikes .  

 ![](favehikes.JPG)