---
sidebar_position: 2
sidebar_label: Content Trackers
---

# What is a web page content tracker?

The web page content tracker is a utility that empowers developers to detect and monitor the content of any web page. Alongside [web page resources trackers](./resources.md), it falls under the category of [synthetic monitoring](https://en.wikipedia.org/wiki/Synthetic_monitoring) tools. However, it extends its capabilities to cover a broader set of use cases. These range from ensuring that the deployed application loads only the intended content throughout its lifecycle to tracking changes in arbitrary web content when the application lacks native tracking capabilities. In the event of a change, whether it's caused by a broken deployment or a legitimate content modification, the tracker promptly notifies the user.

:::caution NOTE
Currently, Secutils.dev doesn't support tracking content for web pages protected by application firewalls (WAF) or any form of CAPTCHA. If you require tracking content for such pages, please comment on [#secutils/34](https://github.com/secutils-dev/secutils/issues/34) to discuss your use case.
:::

On this page, you can find guides on creating and using web page content trackers.

:::note
The `Content extractor` script allows you to extract almost anything as long as it can be considered [**valid markdown-style content**](https://eui.elastic.co/#/editors-syntax/markdown-format#kitchen-sink) and doesn't exceed **200KB** in size. For instance, you can include text, links, images, or even JSON.
:::

## Create a web page content tracker

In this guide, you'll create a simple content tracker for the top post on [Hacker News](https://news.ycombinator.com/):

1. Navigate to [Web Scraping → Content trackers](https://secutils.dev/ws/web_scraping__content) and click **Track content** button
2. Configure a new tracker with the following values:

<table class="su-table">
<tbody>
<tr>
<td><b>Name</b></td>
<td>
```
Hacker News Top Post
```
</td>
</tr>
<tr>
<td><b>URL</b></td>
<td>
```
https://news.ycombinator.com
```
</td>
</tr>
<tr>
<td><b>Frequency</b></td>
<td>
```
Manually
```
</td>
</tr>
<tr>
<td><b>Content extractor</b></td>
<td>
```javascript
return document.querySelector('.titleline')?.textContent  ?? 'Uh oh!';
```
</td>
</tr>
</tbody>
</table>

3. Click the **Save** button to save the tracker
4. Once the tracker is set up, it will appear in the trackers grid
5. Expand the tracker's row and click the **Update** button to make the first snapshot of the web page content

After a few seconds, the tracker will fetch the content of the top post on Hacker News and display it below the tracker's row. The content includes only the title of the post. However, as noted at the beginning of this guide, the content extractor script allows you to return almost anything, even the entire HTML of the post.

Watch the video demo below to see all the steps mentioned earlier in action:

<video controls preload="metadata" width="100%">
  <source src="../../video/guides/web_scraping_content_tracker.webm" type="video/webm" />
  <source src="../../video/guides/web_scraping_content_tracker.mp4" type="video/mp4" />
</video>

## Detect changes with a web page content tracker

In this guide, you'll create a web page content tracker and test it with changing content:

1. Navigate to [Web Scraping → Content trackers](https://secutils.dev/ws/web_scraping__content) and click **Track content** button
2. Configure a new tracker with the following values:

<table class="su-table">
<tbody>
<tr>
<td><b>Name</b></td>
<td>
```
World Clock
```
</td>
</tr>
<tr>
<td><b>URL</b></td>
<td>
```
https://www.timeanddate.com/worldclock/germany/berlin
```
</td>
</tr>
<tr>
<td><b>Delay</b></td>
<td>
```
0
```
</td>
</tr>
<tr>
<td><b>Frequency</b></td>
<td>
```
Hourly
```
</td>
</tr>
<tr>
<td><b>Content extractor</b></td>
<td>
```javascript
const time = document.querySelector('#qlook #ct')?.textContent;
return time 
  ? `Berlin time is [**${time}**](https://www.timeanddate.com/worldclock/germany/berlin)`
  : 'Uh oh!';
```
</td>
</tr>
</tbody>
</table>

3. Click the **Save** button to save the tracker
4. Once the tracker is set up, it will appear in the trackers grid with bell and timer icons, indicating that the tracker is configured to regularly check content and send notifications when changes are detected
5. Expand the tracker's row and click the **Update** button to make the first snapshot of the web page content
6. After a few seconds, the tracker will fetch the current Berlin time and render a nice markdown with a link to a word clock website:

:::note EXAMPLE
Berlin time is [**01:02:03**](https://www.timeanddate.com/worldclock/germany/berlin)
:::

7. With this configuration, the tracker will check the content of the web page every hour and notify you if any changes are detected.

:::caution NOTE
Normally, Secutils.dev caches web page content for **10 minutes**. This means that even if you click the **Update** button repeatedly, you won't see any changes in web content until the cache expires. If you're testing the content tracker and wish to see changes sooner, you can slightly modify the **Headers** or **Content extractor** script to invalidate the cache. Please note that unlike **Headers** or **Content extractor**, changing the **URL** will completely clear your content history.
:::

Watch the video demo below to see all the steps mentioned earlier in action:

<video controls preload="metadata" width="100%">
  <source src="../../video/guides/web_scraping_content_tracker_diff.webm" type="video/webm" />
  <source src="../../video/guides/web_scraping_content_tracker_diff.mp4" type="video/mp4" />
</video>

## Annex: Content extractor script examples

In this section, you can find examples of content extractor scripts that extract various content from web pages. Essentially, the script defines a function executed once the web page fully loads, receiving a single `context` argument. The returned value can be anything as long as it can be serialized to a [JSON string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#description), including any [valid markdown-style content](https://eui.elastic.co/#/editors-syntax/markdown-format#kitchen-sink).

The `context` argument has the following interface:

```typescript
interface Context {
  // The context extracted during the previous execution, if available.
  previous?: T;
  // HTTP response headers returned for the loaded web page.
  responseHeaders: Record<string, string>;
}
```

### Track markdown-style content
The script can return any [**valid markdown-style content**](https://eui.elastic.co/#/editors-syntax/markdown-format#kitchen-sink) that Secutils.dev will happily render in preview mode.

```javascript
return `
## Text
### h3 Heading
#### h4 Heading

**This is bold text**

*This is italic text*

~~Strikethrough~~

## Lists

* Item 1
* Item 2
  * Item 2a

## Code

\`\`\` js
const foo = (bar) => {
  return bar++;
};

console.log(foo(5));
\`\`\`

## Tables

| Option   | Description   |
| -------- | ------------- |
| Option#1 | Description#1 |
| Option#2 | Description#2 |

## Links

[Link Text](https://secutils.dev)

## Emojies

:wink: :cry: :laughing: :yum:
`;
```

### Track API response
You can use content tracker to track API responses as well (until dedicated [`API tracker` utility](https://github.com/secutils-dev/secutils/issues/32) is released). For instance, you can track the response of the [JSONPlaceholder](https://jsonplaceholder.typicode.com/) API:

:::caution NOTE
Ensure that the web page from which you're making a fetch request allows cross-origin requests. Otherwise, you'll get an error.
:::

```javascript
const { url, method, headers, body } = {
    url: 'https://jsonplaceholder.typicode.com/posts',
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({ title: 'foo', body: 'bar', userId: 1 }),
};
const response = await fetch(url, { method, headers, body });
return {
    status: response.status,
    headers: Object.fromEntries(response.headers.entries()),
    body: (await response.text()) ?? '',
};
```

### Use previous content

In the content extract script, you can use the `context.previous` property to access the content extracted during the previous execution:

```javascript
// Update counter based on the previous content.
return (context.previous ?? 0) + 1;
```

### Use external content extractor script
Sometimes, your content extractor script can become large and complicated, making it hard to edit in the Secutils.dev UI. In such cases, you can develop and deploy the script separately in any development environment you prefer. Once the script is deployed, you can use the `import` statement to asynchronously load it:

```javascript
// This code assumes your script exports a function named `run`.
return import('https://secutils-dev.github.io/secutils-sandbox/markdown-table/markdown-table.js')
    .then((module) => module.run(context));
```

You can find more examples of content extractor scripts at the [Secutils.dev Sandbox](https://github.com/secutils-dev/secutils-sandbox/tree/main/content-extractor-scripts) repository.
