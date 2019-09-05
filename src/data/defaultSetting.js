const defaultEmailBody = ({
  email,
  firstName,
  lastName,
}) => `<p class="text-sm font-medium">
Hello,
<br>
<br>
I would like you to check the presentation
<br>
<br>
<br>
Here is the link : <span
  class="forecolor"
>
  {link}</span><span>&nbsp;</span>
<br>
Passcode : <span
  class="forecolor"
>
  {passcode}</span><span>&nbsp;</span>
<br>
<br>
<br>
Let me know on ${email}, if you need any help.
<br>
<br>
Best,
<br>${firstName} ${lastName}
<br>Depuy
</p>`

export { defaultEmailBody }
