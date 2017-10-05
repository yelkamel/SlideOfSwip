# SlideOfSwip
[React-Native][Training] Scrolling, Animation and Gesture


# DYNAMIC HEADER

Dynamic Header with TranslateY (moving view) and nativeDrive (animated Component)
https://medium.com/appandflow/react-native-collapsible-navbar-e51a049b560a
=> height static issue with child view 

Dynamic Header with Heigh dynamic (can't use nativeDrive with Height style property)
https://medium.com/appandflow/react-native-scrollview-animated-header-10a18cb9469e
=> Android version lag when scrolling slow
==> solution: onScroll Event give to much precision for the rendering slowing down the transformation fix the issue.

# SWIPER INDIDE SWIPER

Gesture collision between parent and child swiper fix by using Swiper Package inside TabView and dynamique Swiper page depend on filter

# COLLAPSIBLE LIST
Using FlatList component (better version of ListView) with smooth animation of collapsible view.
