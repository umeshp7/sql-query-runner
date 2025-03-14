# SQL Query Runner

## Overview
This project is part of an assigment submission for Atlan. The app allows you to choose from a set of 3 dummy queries and shows data for each of them. 
The application allows you to view a certain set of Tables, enter a query in a code editor, save query and run the query. You can also visualise your data in a Visualize tab that allows users to switch between various columns to view the Charts and trends. 

## Screenshots
<img width="1469" alt="Screenshot 2025-03-11 at 5 53 33 PM" src="https://github.com/user-attachments/assets/2813a457-a028-4c9e-828b-14ab986269ad" />

---

<img width="1466" alt="Screenshot 2025-03-11 at 5 54 14 PM" src="https://github.com/user-attachments/assets/9c177c92-ecb9-404d-bda8-cac4fb3bf70c" />

---

## Dependencies and Frameworks used
Framework: Used React with Typescript. This app was generated by create-react-app.

Important libraries used: 
1. Codemirror for code editor experience
2. Material UI - Tables, Tabs, Buttons etc.
3. MUI-X - For PieChart and Bar chart visualisation

## Load time of the App
Here is the performance benchmarks from Google Lighthouse.
<img width="876" alt="Screenshot 2025-03-11 at 3 10 41 PM" src="https://github.com/user-attachments/assets/ae1d1062-e533-48f0-835c-16dde3a25b7f" />

To avoid increasing load times:
1. Used lightweight libraries
2. Used best practices in imports to avoid loading unnecessary packages.
3. Material-ui has tree-shaking and used best practices for that.
4. Code mirror is the largest module - Checked alternatives before this monaco, react simple editor. This was the best fit in terms of size and usecase.
