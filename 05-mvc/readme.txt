MVC - Separation of Concerns
-----------------------------
Model:
 - Represent your data in your code
 - Work with your data (eg: save, fetch from DB)
 - Responsible for representing your data
 - Responsible for managing your data (saving, fetching)
 - Doesn't matter if you manage data in memory, files, databases
 - Contains data-related logic

Views:
 - What the user sees
 - Decoupled from your application code
 - Should not contain too much logic (Handlebars!)

Controllers:
 - Connecting your Models and Views
 - Contains the "in-between" logic
 - Should only make sure that the two can communicate (in both directions)

Routes:
 - Upon which path, which http method which controller needs to be executed is decided by Routes
 - Controller controls on which model and which view should be executed for particular path,method or Routes

Both Controller and Routes are split across middleware functions in some manner.