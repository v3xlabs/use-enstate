[![use-enstate](https://raw.githubusercontent.com/v3xlabs/ens-tools/master/.github/banner1.png)](https://www.npmjs.com/package/ens-tools)

> **Note**
>
> This project aims to make the functionality of [enstate.rs](https://github.com/v3xlabs/enstate) accessible to React users,<br />

## Features

-   🪝 React Hook for getting ENS Profiles

## Documentation

For documentation. Stick to the Typescript Intellisense.

## Installation

Install use-enstate and let the magic happen.

```bash
npm install use-enstate
```

## Usage

This library thingiemajig contains the following bits and bobs:

-   [⚛️🪝 useProfile](##%EF%B8%8F-getting-an-ethereum-profile)

### ⚛️🪝 Getting an Ethereum Profile

T

```tsx
import { useProfile } from 'use-enstate';

export const ProfileComponent = () => {
    const { address } = useProfile({
        nameOrAddress: "luc.eth",
    });

    return <div></div>;
};
```

## 🛠️ ens-tools

For more cool bits and bobs for ENS, checkout [ens-tools](https://github.com/v3xlabs/ens-tools)!

## ⚖️ License

[LGPL-3.0](/LICENSE) License