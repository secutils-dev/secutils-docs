---
sidebar_position: 1
sidebar_label: Webhooks
---

# What is a webhook?

A **webhook** is a mechanism that enables an application to receive automatic notifications or data updates by sending a request to a specified URL when a particular event or trigger occurs.

There are various types of webhooks that serve different purposes. One such type is the responder, which is a special webhook that responds to requests with a certain predefined response. A responder is a handy tool when you need to simulate an HTTP endpoint that's not yet implemented or even create a quick ["honeypot"](https://en.wikipedia.org/wiki/Honeypot_(computing)) endpoint. Responders can also serve as a quick and easy way to test HTML, JavaScript, and CSS code.

On this page, you can find several guides on how to create different types of responders.

:::tip NOTE

Each user on  [**secutils.dev**](https://secutils.dev) is assigned a randomly generated dedicated subdomain. This subdomain can host user-specific responders at any path, including the root path. For instance, if your dedicated subdomain is `abcdefg`, creating a responder at `/my-responder` would make it accessible via `https://abcdefg.webhooks.secutils.dev/my-responder`.

:::

## Return a static HTML page

In this guide you'll create a simple responder that returns a static HTML page:

1. Navigate to [Webhooks → Responders](https://secutils.dev/ws/webhooks__responders) and click **Create responder** button
2. Configure a new responder with the following values:

<table class="su-table">
<tbody>
<tr>
<td><b>Name</b></td>
<td>
```
HTML Responder
```
</td>
</tr>
<tr>
<td><b>Path</b></td>
<td>
```
/html-responder
```
</td>
</tr>
<tr>
<td><b>Method</b></td>
<td>
```
GET
```
</td>
</tr>
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
    <title>My HTML responder</title>
</head>
<body>Hello World</body>
</html>
```
</td>
</tr>
</tbody>
</table>

3. Click on the **Save** button to save the responder
4. Once the responder is set up, it will appear in the responders grid along with its unique URL
5. Click on the responder's URL and observe that it renders text `Hello World`

Watch the video demo below to see all the steps mentioned earlier in action:

<video controls preload="metadata" width="100%">
  <source src="../video/guides/webhooks_html_responder.webm" type="video/webm" />
  <source src="../video/guides/webhooks_html_responder.mp4" type="video/mp4" />
</video>

## Emulate a JSON API endpoint

In this guide you'll create a simple responder that returns a JSON value:

1. Navigate to [Webhooks → Responders](https://secutils.dev/ws/webhooks__responders) and click **Create responder** button
2. Configure a new responder with the following values:

<table class="su-table">
<tbody>
<tr>
<td><b>Name</b></td>
<td>
```
JSON Responder
```
</td></tr>
<tr>
<td><b>Path</b></td>
<td>
```
/json-responder
```
</td>
</tr>
<tr>
<td><b>Method</b></td>
<td>
```
GET
```
</td>
</tr>
<tr>
    <td><b>Headers</b></td>
<td>

```http
Content-Type: application/json
```
</td>
</tr>
<tr>
    <td><b>Body</b></td>
<td>

```json
{
  "message": "Hello World"
}
```
</td>
</tr>
</tbody>
</table>

3. Click on the **Save** button to save the responder
4. Once the responder is set up, it will appear in the responders grid along with its unique URL
5. Click on the responder's URL and use an HTTP client, like **cURL**, to verify that it returns a JSON value

Watch the video demo below to see all the steps mentioned earlier in action:

<video controls preload="metadata" width="100%">
  <source src="../video/guides/webhooks_json_responder.webm" type="video/webm" />
  <source src="../video/guides/webhooks_json_responder.mp4" type="video/mp4" />
</video>

## Use the honeypot endpoint to inspect incoming requests

In this guide, you'll create a responder that returns an HTML page with custom Iframely meta-tags, providing a rich preview in Notion. Additionally, the responder will track the five most recent incoming requests, allowing you to see exactly how Notion communicates with the responder's endpoint:

1. Navigate to [Webhooks → Responders](https://secutils.dev/ws/webhooks__responders) and click **Create responder** button
2. Configure a new responder with the following values:

<table class="su-table">
<tbody>
<tr>
<td><b>Name</b></td>
<td>
```
Notion Honeypot
```
</td>
</tr>
<tr>
<td><b>Path</b></td>
<td>
```
/notion-honeypot
```
</td>
</tr>
<tr>
<td><b>Tracking</b></td>
<td>
```
5
```
</td>
</tr>
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
  <meta property="iframely:image"
        content="https://raw.githubusercontent.com/secutils-dev/secutils/main/assets/logo/secutils-logo-initials.png" />
  <meta property="iframely:description"
        content="Inspect incoming HTTP request headers and body with the honeypot endpoint" />
  <title>My HTML responder</title>
</head>
<body>Hello World</body>
</html>
```
</td>
</tr>
</tbody>
</table>

3. Click on the **Save** button to save the responder
4. Once the responder is set up, it will appear in the responders grid along with its unique URL
5. Copy responder's URL and try to create a bookmark for it in Notion
6. Note that the bookmark includes both the description and image retrieved from the rich meta-tags returned by the responder
7. Go back to the responder's grid and expand the responder's row to view the incoming requests it has already tracked

Watch the video demo below to see all the steps mentioned earlier in action:

<video controls preload="metadata" width="100%">
  <source src="../video/guides/webhooks_tracking_responder.webm" type="video/webm" />
  <source src="../video/guides/webhooks_tracking_responder.mp4" type="video/mp4" />
</video>
