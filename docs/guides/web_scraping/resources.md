---
sidebar_position: 1
sidebar_label: Resources Trackers
---

# What is a web page resources tracker?

The web page resources tracker is a utility that gives developers the ability to detect and track resources of any web page. It falls under the category of [synthetic monitoring](https://en.wikipedia.org/wiki/Synthetic_monitoring) tools and helps ensure that the deployed application loads only the intended web resources (JavaScript and CSS) during its lifetime. If any unintended changes occur, which could result from a broken deployment or malicious activity, the tracker will promptly notify developers or IT personnel about the detected anomalies.

Additionally, security researchers focused on discovering potential security vulnerabilities in third-party web applications can use web page resources trackers. By being notified when the application's resources change, researchers can identify if the application has been upgraded, providing an opportunity to re-examine the application and potentially discover new vulnerabilities.

On this page, you can find guides on creating and using web page resources trackers.

## Create a web page resources tracker

In this guide, you'll create a simple resources tracker for the [Hacker News](https://news.ycombinator.com/):

1. Navigate to [Web Scraping → Resources Trackers](https://secutils.dev/ws/web_scraping__resources) and click **Track resources** button
2. Configure a new tracker with the following values:

<table class="su-table">
<tbody>
<tr><td><b>Name</b></td><td><pre>Hacker News</pre></td></tr>
<tr><td><b>URL</b></td><td><pre>https://news.ycombinator.com</pre></td></tr>
</tbody>
</table>

3. Click on the **Save** button to save the tracker
4. Once the tracker is set up, it will appear in the trackers grid
5. Expand the tracker's row and click on the **Fetch resources** button to make the first snapshot of the web page resources 

It's hard to believe, but as of the time of writing, Hacker News continues to rely on just a single script and stylesheet!

Watch the video demo below to see all the steps mentioned earlier in action:

<video controls preload="metadata" width="100%">
  <source src="../../video/guides/web_scraping_resources_tracker.webm" type="video/webm" />
  <source src="../../video/guides/web_scraping_resources_tracker.mp4" type="video/mp4" />
</video>

## Detect changes with a web page resources tracker

In this guide, you will create a web page resources tracker and test it using a custom HTML responder:

1. First, navigate to [Webhooks → Responders](https://secutils.dev/ws/webhooks__responders) and click **Create responder** button
2. Configure a few responders with the following values to emulate JavaScript files that we will track changes for across revisions:

This JavaScript **will remain unchanged** across revisions:
<table class="su-table">
<tbody>
<tr><td><b>Name</b></td><td><pre>no-changes.js</pre></td></tr>
<tr>
    <td><b>Headers</b></td>
<td>

```http
Content-Type: application/javascript; charset=utf-8
```
</td>
</tr>
<tr>
    <td><b>Body</b></td>
<td>

```js
document.body.insertAdjacentHTML(
  'beforeend',
  'Source: no-changes.js<br>'
);
```
</td>
</tr>
</tbody>
</table>

This JavaScript **will change** across revisions:
<table class="su-table">
<tbody>
<tr><td><b>Name</b></td><td><pre>changed.js</pre></td></tr>
<tr>
    <td><b>Headers</b></td>
<td>

```http
Content-Type: application/javascript; charset=utf-8
```
</td>
</tr>
<tr>
    <td><b>Body</b></td>
<td>

```js
document.body.insertAdjacentHTML(
  'beforeend',
  'Source: changed.js, Changed: no<br>'
);
```
</td>
</tr>
</tbody>
</table>

This JavaScript **will be removed** across revisions:
<table class="su-table">
<tbody>
<tr><td><b>Name</b></td><td><pre>removed.js</pre></td></tr>
<tr>
    <td><b>Headers</b></td>
<td>

```http
Content-Type: application/javascript; charset=utf-8
```
</td>
</tr>
<tr>
    <td><b>Body</b></td>
<td>

```js
document.body.insertAdjacentHTML(
  'beforeend',
  'Source: removed.js<br>'
);
```
</td>
</tr>
</tbody>
</table>

This JavaScript **will be added** in a new revision:
<table class="su-table">
<tbody>
<tr><td><b>Name</b></td><td><pre>added.js</pre></td></tr>
<tr>
    <td><b>Headers</b></td>
<td>

```http
Content-Type: application/javascript; charset=utf-8
```
</td>
</tr>
<tr>
    <td><b>Body</b></td>
<td>

```js
document.body.insertAdjacentHTML(
  'beforeend',
  'Source: added.js<br>'
);
```
</td>
</tr>
</tbody>
</table>

3. Now, configure a new responder with the following values to respond with a simple HTML page that references previously created JavaScript responders (except for `added.js`):

<table class="su-table">
<tbody>
<tr><td><b>Name</b></td><td><pre>track-me.html</pre></td></tr>
<tr>
    <td><b>Headers</b></td>
<td>

```http
Content-Type: text/html; charset=utf-8
```
</td>
</tr>
<tr>
    <td><b>Body</b></td>
<td>

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Evaluate resources tracker</title>
  <script type="text/javascript" src="./no-changes.js" defer></script>
  <script type="text/javascript" src="./changed.js" defer></script>
  <script type="text/javascript" src="./removed.js" defer></script>
</head>
<body></body>
</html>
```
</td>
</tr>
</tbody>
</table>

4. Click on the **Save** button to save the responder
5. Once the responder is set up, it will appear in the responders grid along with its unique URL
6. Click on the responder's URL and make sure that it renders the following content:

```html
Source: no-changes.js
Source: changed.js, Changed: no
Source: removed.js
```
7. Now, navigate to [Web Scraping → Resources Trackers](https://secutils.dev/ws/web_scraping__resources) and click **Track resources** button
8. Configure a new tracker for `track-me.html` responder with the following values:

<table class="su-table">
<tbody>
<tr><td><b>Name</b></td><td><pre>Demo</pre></td></tr>
<tr><td><b>URL</b></td><td><pre>https://secutils.dev/api/webhooks/ar/<b>[YOUR UNIQUE ID]</b>/track-me.html</pre></td></tr>
</tbody>
</table>

9. Click on the **Save** button to save the tracker
10. Once the tracker is set up, it will appear in the trackers grid
11. Expand the tracker's row and click on the **Fetch resources** button to make the first snapshot of the web page resources
12. Once the tracker has fetched the resources, they will appear in the resources grid:

<table class="su-table">
<tbody>
<tr><th>Source</th><th>Diff</th><th>Type</th><th>Size</th></tr>
<tr><td>https://secutils.dev/api/webhooks/ar/[YOUR UNIQUE ID]/no-change.js</td><td>-</td><td>Script</td><td>81</td></tr>
<tr><td>https://secutils.dev/api/webhooks/ar/[YOUR UNIQUE ID]/changed.js</td><td>-</td><td>Script</td><td>91</td></tr>
<tr><td>https://secutils.dev/api/webhooks/ar/[YOUR UNIQUE ID]/removed.js</td><td>-</td><td>Script</td><td>78</td></tr>
</tbody>
</table>

13. Now, navigate to [Webhooks → Responders](https://secutils.dev/ws/webhooks__responders) and edit `track-me.html` responder to reference `added.js` responder, and remove reference to `removed.js`:

```diff
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Evaluate resources tracker</title>
  <script type="text/javascript" src="./no-changes.js" defer></script>
  <script type="text/javascript" src="./changed.js" defer></script>
// highlight-next-line
- <script type="text/javascript" src="./removed.js" defer></script>
// highlight-next-line
+ <script type="text/javascript" src="./added.js" defer></script>
</head>
<body></body>
</html>
```

14. Next, change the body of the `changed.js` responder to something like this:

```diff
document.body.insertAdjacentHTML(
  'beforeend',
// highlight-next-line
- 'Source: changed.js, Changed: no<br>'
// highlight-next-line
+ 'Source: changed.js, Changed: yes<br>'
);
```

15. Finally, navigate to [Web Scraping → Resources Trackers](https://secutils.dev/ws/web_scraping__resources) and expand the `Demo` tracker's row
16. Click **Fetch resources** button to fetch the next revision of the web page resources
:::caution NOTE
Normally, Secutils.dev caches web page resources for **10 minutes**. This means that if you make changes to the web page resources and want to see them reflected in the tracker, you'll need to wait for 10 minutes before re-fetching resources. However, for this guide, I've disabled caching for the tracker so that you can see changes immediately.
:::
17. Once the tracker has fetched updated resources, they will appear in the resources grid together with the diff status:

<table class="su-table">
<tbody>
<tr><th>Source</th><th>Diff</th><th>Type</th><th>Size</th></tr>
<tr><td>https://secutils.dev/api/webhooks/ar/[YOUR UNIQUE ID]/no-change.js</td><td><b>-</b></td><td>Script</td><td>81</td></tr>
<tr><td>https://secutils.dev/api/webhooks/ar/[YOUR UNIQUE ID]/changed.js</td><td><b>Changed</b></td><td>Script</td><td>91</td></tr>
<tr><td>https://secutils.dev/api/webhooks/ar/[YOUR UNIQUE ID]/added.js</td><td><b>Added</b></td><td>Script</td><td>76</td></tr>
<tr><td>https://secutils.dev/api/webhooks/ar/[YOUR UNIQUE ID]/removed.js</td><td><b>Removed</b></td><td>Script</td><td>78</td></tr>
</tbody>
</table>

Watch the video demo below to see all the steps mentioned earlier in action:

<video controls preload="metadata" width="100%">
  <source src="../../video/guides/web_scraping_resources_tracker_diff.webm" type="video/webm" />
  <source src="../../video/guides/web_scraping_resources_tracker_diff.mp4" type="video/mp4" />
</video>
