# ESM GitHub API

## Status

This is unfortunately not usable at the moment, `--experimental-network-imports`
is available now, but it seems as though the dependencies pulled in over HTTP(S)
cannot in turn depend on built-in Node modules.

I tried using the `node:` protocol to see if it helps, but it does not.

I will revisit this in a year or so and see if it is more usable then.

## Usage

Use `--experimental-network-imports` with Node for HTTP(S) ESM URL support:

https://nodejs.org/api/esm.html#https-and-http-imports

```javascript
import $ from 'https://tomashubelbauer.github.io/esm-github-api/$.js';
```

## Development

`node --experimental-network-imports --no-warnings test`

## Samples

### Find out how many repository API pages

```javascript
import surveyPages from 'https://tomashubelbauer.github.io/esm-github-api/surveyPages.js';

const pages = await surveyPages(token, 'user/repos', { per_page: 100, type: 'owner' });
console.log('Found', pages, 'repo pages');
```

### Fetch an API page of repositories

```javascript
import callGitHub from 'https://tomashubelbauer.github.io/esm-github-api/callGitHub.js';

const page = 1;
const repos = await callGitHub(token, 'user/repos', { params: { per_page: 100, page, type: 'owner' } });
console.log('Fetched', repos.length, 'repos on page', page);
```

### Create a new issue

```javascript
import callGitHub from 'https://tomashubelbauer.github.io/esm-github-api/callGitHub.js';

const title = 'Issue title';
const body = 'Issue body';
const { url } = await callGitHub(token, 'repos/$owner/$repo/issues', { method: 'POST', body: { title, body } });
console.log(url);
```

### Close an existing issue

```javascript
import callGitHub from 'https://tomashubelbauer.github.io/esm-github-api/callGitHub.js';

await callGitHub(token, 'repos/$owner/$repo/issues/$number', { method: 'PATCH', body: { states: 'closed' } });
```

### Download a plain text file (without parsing JSON)

```javascript
import https from 'https';
import promisify from 'https://tomashubelbauer.github.io/esm-github-api/promisify.js';
import buffer from 'https://tomashubelbauer.github.io/esm-github-api/buffer.js';

const response = await promisify(https.get)('https://example.com');
const text = await buffer(response);
```

## To-Do

### Pull out `promisify` and `buffer` to a more generic repository

This repository and its scripts should be a user and not the source of these
methods.
