This library combines [uritemplate-js](https://github.com/fxa/uritemplate-js)
with jQuery to process [RFC 6570](http://tools.ietf.org/html/rfc6570)
URI Templates before the form is submitted.

In other words, when this library is loaded, given this form:

```html
<form action="/api/users/{username}" method="GET">
    <label>
        username
        <input name="username" type="text" value="example">
    </label>
    <input type="submit">
</form>
```

The action will be updated to `/api/users/example` when the
form is submitted.

## Build

To build, install the requirejs optimizer node package:

    npm install requirejs

Then:

	r.js -o build.js

## When To Use It

If you have an api that uses templated routes, this can help
you write forms that test the routes.

## Why You Should Not Use It

It breaks the web. URI Templates are not part of any html
standard. User agents that do not enable javascript will
not work. It does not degrade gracefully.

Caveat emptor.
