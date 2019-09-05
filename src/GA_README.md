# Google Analytics Integration

> Depuysynthes Gladiator app google analytics integration

> > ## Steps to follow for google anlytics integration

### 1. Create Google Analytics 4 (GA4) account. GA4 is default.

```bash
> go to https://marketingplatform.google.com/about/analytics/
> click on Start for free
> click on Create account then select for Myself
> fill the form by inserting your name,email and password then click next
> On Account setup, Fill the Account name and click next
> Click on start Measuring
> On property setup, Fill the property name and click next
> On about your business, select the business size
> click all the checklist under How do you intend to use Google Analytics with your business? section (optional)
> click create
> accept the terms and agreement
> close My email communication panel by clicking the save button
> click Web under Choose a platform
> fill website URL and stream name and click at Create Stream
```

### 2. Add Google Analytics Tracking ID in to the code

```bash
 > go to Admin> Data Streams >  web
 > click on the created web stream
 > copy MEASURMENT ID value, located at the right top corner of the web stream details
 > past MEASURMENT ID value to the code
```

### 3.View Reports

```bash
 > click on Reports
 > In Reports snapshot users,event count,users list by country,event count by event name,view by page title and more reports are available
 > to see the realtime data click on Realtime
```

### 4.List Events by Presentation ID

```bash
> Navigate to the Explore page
> Click the explore named by Event Count by Presentation ID
```

### 5. Create Exploration by Presentation ID

```bash
> Navigate to the Explore page
> Select Free form from the Template gallery
In the Variables Section
> Set Exploration name, you can set whatever name you want. If you skip this the exploration name will be Free form
> On the same section pick date range from the dropdown
> On the same section import Content ID into DIMENSIONS field
To import Content ID, > Click on + button,+ button is available right next to DIMENSIONS
                      > then find Content ID inside page/screen
                      > then mark it and click the import button at the top
In the Tab Setting Section
> Remove City from Rows by clicking the X button. The X button will be displayed when you hover over City.
> Drag and drop Content ID into Rows field or double click on Content ID to add into Rows
> Remove Catagories from Columns (make this field empty)
> Remove Active users from the Values field by clicking on the X button. The X button will be displayed when you hover over Active users
> Drag and drop Event Count into Values field or double click on Event Count to add it into Values field. Event count is available under Variables section in the METRICS . Values field is available under the Tab Setting section.
> You are done, now you can see Event counts by Presentation ID. Navigate to Explore page then, you will see the created Exploration in the table with the name you set on exploration creation
```
