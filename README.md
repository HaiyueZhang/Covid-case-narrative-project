# The Covid Case in New York

## Messaging

- I want to show the line chart visualizaton of reported new covid-19 case in New York from 2021-01-23 to 2022-02-23. This period exhibits significant fluctuations on the number of new covid case, which allows us to observe the trends during this period and find the relationship between government responses and changes on new covid case.

## Narrative Structure

- My narrative visualization follows the structure of an "Interactive Slideshow."

- My narrative visualization provides viewers with opportunties to drill down in a particular slide. Each of scene, a portion of the entire time period, contains their data and text contexts of the new covid cases in New York and Government responses for a specifc time period, which makes viewers understand that each scene is connected by time.

- Viewers are allowed to explore each scene as they can choose which scene to view and when to view it by using buttons. Within each scene, interactive elements, dots on line charts from scene 1 to scene 4, allow viewers to hover over to get more detailed information. This offers an additional level of viewer-directed exploration within each step of the story.

## Visual Structure

- Each scene contains line chart, tooltips and dots, annotations, arrow marker, title and axis labels and transition buttons

- <b>Line Chart:</b> The line chart is the primary means of visual representation in this scene. The X-axis represents the date and the Y-axis represents the number of COVID-19 cases. It helps the viewer understand the trend of COVID-19 cases during the given period.

- <b>Tooltips and Dots:</b> The dots on the line represent individual data points for each day. When the viewer hovers over a dot, the dot becomes larger and a tooltip appears showing the exact date and number of cases. This interactive feature enables the viewer to engage with and explore the data in more detail.

- <b>Annotations:</b> Annotations, including both general and specific, are used to highlight the important parts of the data. The general annotation provides a summary of what's happening during this period, and the specific annotation highlights a key data point (vertex point). This not only attracts the viewer's attention to the crucial points, but also adds context and interpretation to the raw numbers.

- <b>Arrow Marker:</b> The arrow marker points to the vertex point of the cases, reinforcing the specific annotation and guiding the viewer's attention to this important point.

- <b>Title and Axis Labels:</b> The title gives a brief description of what the chart is about and which time period this chart shows, and the axis labels indicate what each axis represents.

- <b>Transition buttons:</b> Viewers can click buttons on the top of each scene to switch to any other scenes they like, which is easy for the viewer to understand how the data connects across different scenes. The viewer will be able to observe how the trend of COVID-19 cases changes over different time periods and in response to different government actions.

## Scenes

- There are five scenes in my narrative visualization. Specifically, four of them progress chronologically through different time periods, each scene showing the trend( <b>Recession</b>, <b>Plateau</b>, <b>Fluctuating</b>, and <b>Peak</b>) of reported new COVID-19 cases in New York during a specific time frame. And the fifth scene provides an overview of the <b>entire</b> period.

- The ordering of the scenes would then logically follow the progression of time. The purpose of this would be to clearly depict the chronological order of events and to demonstrate how earlier events might have influenced later trends. This way, the viewer can understand the cause-and-effect relationship between different actions (like government mandates) and the resulting changes in COVID-19 case counts.

## Annotations

- The general summary annotation follows a template that explains overall trends and notable events during the displayed time period. It's contained within a rectangular box and provides context to the data being visualized. It starts with an overview of the trends (increasing or decreasing number of cases), then gives specific government responses tied to those trends. The location, size, and placement of the annotation box, as well as the structured and detailed content of the annotation, follows a descriptive and explanatory template. The aim is to provide relevant context and enhance the viewers' understanding of the scene.

- Specific point annotation is used to draw attention to a crucial data point or an event in the time period. In the given code, an arrow points to the peak number of reported cases, with an annotation providing the exact date and number of cases. This annotation follows a concise, informative template and helps to underline a significant event.

- The annotations can change within a single scene, especially for the tooltips used in the line chart. When the viewer hovers over a dot, the dot becomes larger and a tooltip appears showing the exact date and number of cases. Dynamic annotations can provide additional information and context about specific data points or regions of the chart that the viewer is interested in.

- Both types of annotations support the messaging by offering necessary context and focus, aiding in the interpretation of data, and emphasizing important points or events. They guide the viewers' attention to what matters most in the data and enhance the storytelling aspect of the visualization.

## Parameters

- The Parameters in my narrative visualization

  - Time period: The data is filtered by specific dates.
  - X and Y scales: The scales for the axes are set based on the data.
  - Data points: Each point represents a specific day's COVID-19 case count.
  - Annotations: Annotations include tooltips, general statements, and special highlights.
  - Transition buttons: Transitions between scenes.

- In my narrative visualization, each scene represents a different state. These states are defined by the time period and the related COVID-19 case data for that time period. The parameters (time, case counts, annotations, and transitions) are adjusted for each scene to reflect the data and story for that specific time period.

- The changes in the state from one scene to the next represent the evolution of the narrative, guided by the parameters, and this gives your viewers a dynamic and engaging storytelling experience.

## Triggers

- Mouseover on dots: When the user hovers over a dot, this triggers a state change where the dot's size increases and a stroke is added around it. Additionally, a tooltip becomes visible, displaying the date and number of cases for the hovered dot. This makes the interaction more engaging and provides detailed information about specific data points.
- Mousemove on dots: When the user moves the mouse while over a dot, the position of the tooltip changes accordingly. This keeps the tooltip close to the user's cursor and the data point they are currently focusing on.
- Mouseout from dots: When the user moves the cursor away from a dot, this triggers a state change where the dot's size and stroke are restored to their original state and the tooltip becomes hidden. This returns the visualization to its normal state after the specific interaction is finished.

- As for affordances, they are clues or indicators that suggest the functionality or possibilities of interaction to the user. In your visualization:

  - Dots: The presence of dots on the line graph serves as an affordance, indicating that these points are interactive.
  - Cursor changes: When the cursor changes upon hovering over a dot (typically to a hand pointer), it suggests to the user that an interaction (like clicking or dragging) is possible.
  - Tooltip: The appearance of a tooltip on hovering over a dot gives the user information about what that dot represents, providing an immediate understanding of the affordance.
  - Visual cues: The visual elements like the axes, labels, and annotations guide the user's attention and understanding, suggesting areas of interest or points of focus.
