---
sidebar_position: 1
sidebar_label: Content Security Policy
---

# What is a Content Security Policy?

Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross-Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft, to site defacement, to malware distribution.

Generally, to enable CSP, you need to configure your web server to return the **Content-Security-Policy** HTTP header or HTML meta tag. For more details, refer to [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) and [OWASP](https://owasp.org/www-community/controls/Content_Security_Policy).

On this page, you can find guides on creating Content Security Policies that match your specific needs.

## Create a Content Security Policy

In this guide you'll create a simple Content Security Policy template that allows you to generate policies that are ready to be applied to any web application:

1. Navigate to [Web Security → CSP → Policies](https://secutils.dev/ws/web_security__csp__policies) and click **Create policy** button
2. Configure a new policy with the following values:

<table class="su-table">
<tbody>
<tr><td><b>Name</b></td><td><pre>secutils.dev</pre></td></tr>
<tr><td><b>Default source (default-src)</b></td><td><pre>'self', api.secutils.dev</pre></td></tr>
<tr><td><b>Style source (style-src)</b></td><td><pre>'self', fonts.googleapis.com</pre></td></tr>
</tbody>
</table>

3. Click on the **Save** button to save the policy
4. Once the policy is set up, it will appear in the policies grid
5. Click on the policy's **Copy policy** button and use **Policy source** dropdown to switch between different policy representations:

<table class="su-table">
<tbody>
<tr><td><b>HTTP header</b></td><td><pre>Content-Security-Policy: default-src 'self' api.secutils.dev; style-src 'self' fonts.googleapis.com</pre></td></tr>
<tr>
    <td><b>HTML tag</b></td>
<td>

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self' api.secutils.dev; style-src 'self' fonts.googleapis.com">
```
</td>
</tr>
</tbody>
</table>

Watch the video demo below to see all the steps mentioned earlier in action:

<video controls preload="metadata" width="100%">
  <source src="../../video/guides/web_security_csp_new_policy.webm" type="video/webm" />
  <source src="../../video/guides/web_security_csp_new_policy.mp4" type="video/mp4" />
</video>

## Test a Content Security Policy

In this guide, you will create a Content Security Policy and test it using a custom HTML responder:

1. First, navigate to [Webhooks → Responders](https://secutils.dev/ws/webhooks__responders) and click **Create responder** button
2. Configure a new responder with the following values to respond with a simple HTML page that uses **eval()** function to evaluate JavaScript code represented as a string:

<table class="su-table">
<tbody>
<tr><td><b>Name</b></td><td><pre>csp-test</pre></td></tr>
<tr><td><b>Method</b></td><td><pre>GET</pre></td></tr>
<tr>
    <td><b>Body</b></td>
<td>

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Evaluate CSP</title>
</head>
<body>
<label for="eval-input">Expression to evaluate:</label>
<input id="eval-input" type="text" value="alert('xss')"/>
<button id="eval-test">Eval</button>
<script type="text/javascript" defer>
  (async function main() {
    const evalTestBtn = document.getElementById('eval-test');
    evalTestBtn.addEventListener('click', () => {
      const evalExpression = document.getElementById('eval-input');
      window.eval(evalExpression.value);
    });
  })();
</script>
</body>
</html>
```
</td>
</tr>
</tbody>
</table>

3. Click on the **Save** button to save the responder
4. Once the responder is set up, it will appear in the responders grid along with its unique URL
5. Click on the responder's URL and use **Eval** button on the rendered page to see that nothing prevents you from using **eval()** function
6. Now, navigate to [Web Security → CSP → Policies](https://secutils.dev/ws/web_security__csp__policies) and click **Create policy** button to create a Content Security Policy to forbid **eval()**
7. Configure a new policy with the following values:

<table class="su-table">
<tbody>
<tr><td><b>Name</b></td><td><pre>csp</pre></td></tr>
<tr><td><b>Script source (script-src)</b></td><td><pre>'self', 'unsafe-inline'</pre></td></tr>
</tbody>
</table>

8. Click on the **Save** button to save the policy
9. Once the policy is set up, it will appear in the policies grid
10. Click on the policy's **Copy policy** button and use **Policy source** dropdown to switch to **HTML tag** policy representation
11. Copy `<meta>` HTML tag with the policy and navigate to [Webhooks → Responders](https://secutils.dev/ws/webhooks__responders) again
12. Edit **Body** property of the previously created **csp-test** responder to include `<meta>` HTML tag with the policy inside `<head>` HTML tag
13. Click on the **Save** button and navigate to the responder's URL again
14. This time, when you click on the **Eval** button, nothing happens and an error message is logged in the browser console meaning that you have successfully forbidden **eval()** with the Content Security Policy

Watch the video demo below to see all the steps mentioned earlier in action:

<video controls preload="metadata" width="100%">
  <source src="../../video/guides/web_security_csp_test_policy.webm" type="video/webm" />
  <source src="../../video/guides/web_security_csp_test_policy.mp4" type="video/mp4" />
</video>

## Report Content Security Policy violations

In this guide, you will create a Content Security Policy and collect its violation reports using a custom tracking responder:

1. Navigate to [Web Security → CSP → Policies](https://secutils.dev/ws/web_security__csp__policies) and click **Create policy** button
2. Configure a new policy with the following values:

<table class="su-table">
<tbody>
<tr><td><b>Name</b></td><td><pre>csp</pre></td></tr>
<tr><td><b>Script source (script-src)</b></td><td><pre>'self', 'unsafe-inline', 'report-sample'</pre></td></tr>
<tr><td><b>Report to (report-to)</b></td><td><pre>default</pre></td></tr>
</tbody>
</table>

3. Click on the **Save** button to save the policy
4. Once the policy is set up, it will appear in the policies grid
5. Click on the policy's **Copy policy** button, switch **Policy source** to **HTTP header** and copy generated policy header
6. Now, navigate to [Webhooks → Responders](https://secutils.dev/ws/webhooks__responders) and click **Create responder** button
7. Configure a new responder with the following values to collect CSP violation reports:

<table class="su-table">
<tbody>
<tr><td><b>Name</b></td><td><pre>csp-reporting</pre></td></tr>
<tr><td><b>Method</b></td><td><pre>POST</pre></td></tr>
<tr><td><b>Tracking</b></td><td><pre>10</pre></td></tr>
</tbody>
</table>

8. Click on the **Save** button and copy responder's URL
9. Click **Create responder** button once again
10. Configure another responder with the following values to respond with a simple HTML page that will try to use **eval()** function to evaluate JavaScript code represented as a string:

<table class="su-table">
<tbody>
<tr><td><b>Name</b></td><td><pre>csp-test</pre></td></tr>
<tr><td><b>Method</b></td><td><pre>GET</pre></td></tr>
<tr>
    <td><b>Headers</b></td>
<td>

```http
Reporting-Endpoints: default="[`csp-reporting` responder URL]",
Content-Security-Policy: [`csp` policy content],
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
  <title>Evaluate CSP</title>
</head>
<body>
<label for="eval-input">Expression to evaluate:</label>
<input id="eval-input" type="text" value="alert('xss')"/>
<button id="eval-test">Eval</button>
<script type="text/javascript" defer>
  (async function main() {
    const evalTestBtn = document.getElementById('eval-test');
    evalTestBtn.addEventListener('click', () => {
      const evalExpression = document.getElementById('eval-input');
      window.eval(evalExpression.value);
    });
  })();
</script>
</body>
</html>
```
</td>
</tr>
</tbody>
</table>

11. Click on the **Save** button to save the responder
12. Once the responder is set up, it will appear in the responders grid along with its unique URL
13. Click on the responder's URL to navigate to the test page
14. On the test page, click on the **Eval** button and notice that nothing happens except that browser logs an error message in its console meaning that you have successfully forbidden **eval()** with the Content Security Policy
15. Go back to the responder's grid and expand the **csp-reporting** responder to view the CSP violation report that browser has sent when you tried to use **eval()**

Watch the video demo below to see all the steps mentioned earlier in action:

<video controls preload="metadata" width="100%">
  <source src="../../video/guides/web_security_csp_report_policy_violations.webm" type="video/webm" />
  <source src="../../video/guides/web_security_csp_report_policy_violations.mp4" type="video/mp4" />
</video>
