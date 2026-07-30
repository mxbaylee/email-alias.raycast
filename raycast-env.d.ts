/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** Email Domain - Enter the domain of your provider. */
  "emailDomain": string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `receive-alias` command */
  export type ReceiveAlias = ExtensionPreferences & {}
  /** Preferences accessible in the `send-from-alias` command */
  export type SendFromAlias = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `receive-alias` command */
  export type ReceiveAlias = {}
  /** Arguments passed to the `send-from-alias` command */
  export type SendFromAlias = {}
}

