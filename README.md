<!-- Title -->
<h1 align="center">
  paddle-webhook-verification
</h1>

<!-- Description -->
<h4 align="center"> 
  Verifies the signature of webhook requests from <a href="https://paddle.com">Paddle</a>.
</h4>
<p align="center">
  This is the example code from <a href="https://paddle.com/docs/reference-verifying-webhooks/">the Paddle documentation</a>,
  but cleaned up with types & tests.
</p>

<!-- Badges -->
<p align="center">
  <a href="https://www.npmjs.com/package/@devoxa/paddle-webhook-verification">
    <img
      src="https://img.shields.io/npm/v/@devoxa/paddle-webhook-verification?style=flat-square"
      alt="Package Version"
    />
  </a>

  <a href="https://app.circleci.com/pipelines/github/devoxa/paddle-webhook-verification?branch=master">
    <img
      src="https://img.shields.io/circleci/build/github/devoxa/paddle-webhook-verification/master?style=flat-square"
      alt="Build Status"
    />
  </a>

  <a href="https://codecov.io/github/devoxa/paddle-webhook-verification">
    <img
      src="https://img.shields.io/codecov/c/github/devoxa/paddle-webhook-verification/master?style=flat-square"
      alt="Code Coverage"
    />
  </a>
</p>

<!-- Quicklinks -->
<p align="center">
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#contributors">Contributors</a> •
  <a href="#license">License</a>
</p>

<br>

## Installation

:warning: This package is deprecated, please use [@devoxa/paddle-sdk](https://github.com/devoxa/paddle-sdk) instead.

```bash
yarn add @devoxa/paddle-webhook-verification
```

## Usage

You can use this module as just a verification function for your post body:

```ts
import { verify } from '@devoxa/paddle-webhook-verification'

const publicKey = `-----BEGIN PUBLIC KEY-----
...
-----END PUBLIC KEY-----`

const postBody = {
  alert_id: '970782801',
  // ...
  p_signature: 'avXxYVv9gQ...EyU9o430N0=',
}

const isVerified = verify(publicKey, postBody)
```

You can also use it as a type guard:

```ts
if (verify(publicKey, postBody)) {
  switch (postBody.alert_name) {
    case 'subscription_created':
      // postBody is typed as PaddleSubscriptionCreatedEvent
      break
  }
} else {
  throw new Error('Failed verification of post body')
}
```

:warning: To discriminate the returned union based on `alert_name`, you have to use a `switch`
statement. `if` statements will not work until
[this PR](https://github.com/microsoft/TypeScript/pull/38311) has been merged into TypeScript.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://www.david-reess.de"><img src="https://avatars3.githubusercontent.com/u/4615516?v=4" width="75px;" alt=""/><br /><sub><b>David Reeß</b></sub></a><br /><a href="https://github.com/devoxa/paddle-webhook-verification/commits?author=queicherius" title="Code">💻</a> <a href="https://github.com/devoxa/paddle-webhook-verification/commits?author=queicherius" title="Documentation">📖</a> <a href="https://github.com/devoxa/paddle-webhook-verification/commits?author=queicherius" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors)
specification. Contributions of any kind welcome!

## License

MIT
