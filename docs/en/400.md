# 400 Bad Request

A 400 Bad Request error occurs when the server cannot process a request because it is invalid. This can result in certain pages being inaccessible through the back-end, and it may prevent plugins or other files from being uploaded. It usually happens when ModSecurity is enabled, as it can block legitimate requests and trigger errors.

## Troubleshooting
If you are still developing your website, it is recommended to *temporarily disable ModSecurity*. To do this; 

1. Go to your Website in the hosting control panel,
2. Click **Advanced** and select **Security**
3. In the second section under ModSecurity, use the toggle to disable it.

<br>

::: tip 
If the issue persists, please contact our support team for assistance.
:::
