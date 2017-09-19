````js
 {
   entities: {
     team: {
       id: 1,
       name: "Fullstack",
       lead_id: 1
     },
     members: {
       1: {
         id: 1,
         name: "John Doe",
         email: "johndoe@gmail.com"
       }
     }
     projects: {
       4: {
         id: 4,
         name: "Chess",
         lead_id: 9,
         member_ids: [5,6,7],
         task_ids: [1,4,8],
         public: true
       }
     },
     tasks: {
       id: 1,
       title: "Add Pieces class",
       description: "Finish code to implement pieces",
       assignee_id: 5,
       public: true,
       project_id: 4
     }
   },
   session: {
     current_user: {
       id: 1,
       name: "John Doe"
        email: "johndoe@gmail.com"
     },
     teams: {
       1: {
         id: 1,
         name: "Fullstack",
         lead_id: 1
      },
      2: {
        id: 2,
        name: "Flex",
        lead_id: 1
      }
    }
   },
   ui: {
     loading: false,
     display: {
       nav: true,
       tasks_index: true,
       tasks_form: false
     }
   },
   errors: {
     login: null
   }
 }
````
