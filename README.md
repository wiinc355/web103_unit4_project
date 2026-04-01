# WEB103 Project 4 - *DIY Delight*

Submitted by: **Derrick Woodall**

About this web app: **The application I am developing is a dynamic item personalization web app that allows users to create and customize their own unique products. Inspired by the growing demand for personalized items such as shoes, phone cases, and more, this app provides an interactive interface where users can select from multiple customizable features and options, with real-time visual updates reflecting their choices. Built using React and connected to a PostgreSQL database, the platform enables full CRUD functionality, allowing users to create, view, edit, and delete their custom items seamlessly. As users select different features, the total price updates dynamically, ensuring transparency and flexibility throughout the customization process. Additionally, the app includes validation to prevent invalid combinations, ensuring only viable custom items are saved, while offering a clean and intuitive experience for managing all created items.**

Time spent: **14** hours

## Required Features

The following **required** functionality is completed:

<!-- Make sure to check off completed functionality below -->
- [X] **The web app uses React to display data from the API.**
- [X] **The web app is connected to a PostgreSQL database, with an appropriately structured `CustomItem` table.**
- [X]  **NOTE: Your walkthrough added to the README must include a view of your Render dashboard demonstrating that your Postgres database is available**
- [X]  **NOTE: Your walkthrough added to the README must include a demonstration of your table contents. Use the psql command 'SELECT * FROM tablename;' to display your table contents.**
- [X] **Users can view **multiple** features of the `CustomItem` (e.g. car) they can customize, (e.g. wheels, exterior, etc.)**
- [X] **Each customizable feature has multiple options to choose from (e.g. exterior could be red, blue, black, etc.)**
- [X] **On selecting each option, the displayed visual icon for the `CustomItem` updates to match the option the user chose.**
- [X] **The price of the `CustomItem` (e.g. car) changes dynamically as different options are selected *OR* The app displays the total price of all features.**
- [X] **The visual interface changes in response to at least one customizable feature.**
- [X] **The user can submit their choices to save the item to the list of created `CustomItem`s.**
- [ ] **If a user submits a feature combo that is impossible, they should receive an appropriate error message and the item should not be saved to the database.**
- [X] **Users can view a list of all submitted `CustomItem`s.**
- [X] **Users can edit a submitted `CustomItem` from the list view of submitted `CustomItem`s.**
- [X] **Users can delete a submitted `CustomItem` from the list view of submitted `CustomItem`s.**
- [X] **Users can update or delete `CustomItem`s that have been created from the detail page.**


The following **optional** features are implemented:

- [ ] Selecting particular options prevents incompatible options from being selected even before form submission

The following **additional** features are implemented:

- [X] List anything else that you added to improve the site's functionality! ( ADMINISTRATORS CAN LOG IN TO UP DATE THE CAR FEATURES)
## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src="https://github.com/wiinc355/web103_unit4_project.git/DIY-Delight-My-Walkthough.gif" width="700">
<img src='https://raw.githubusercontent.com/wiinc355/web103_unit4_project/refs/heads/main/DIY-Delight-My-Walkthough-A.png' alt='Video Walkthrough' />
<img src='https://raw.githubusercontent.com/wiinc355/web103_unit4_project/refs/heads/main/DIY-Delight-My-Walkthough-B.png' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with ...  GIF tool here
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

Describe any challenges encountered while building the app or any additional context you'd like to add.

## License

Copyright [yyyy] [name of copyright owner]

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.