import {
  Action,
  ActionPanel,
  BrowserExtension,
  Color,
  Form,
  getPreferenceValues,
  Icon,
} from "@raycast/api";
import { useEffect, useState } from "react";
import { buildOutboundAddress, generateRandomHex, getName } from "./util";

interface Preferences {
  emailDomain: string;
}

function isValidEmail(value: string): boolean {
  return value.includes("@") && value.indexOf("@") < value.length - 1;
}

export default function Command() {
  const { emailDomain } = getPreferenceValues<Preferences>();
  const [hash] = useState(() => generateRandomHex(4));
  const [alias, setAlias] = useState<string>("");
  const [recipient, setRecipient] = useState<string>("");

  useEffect(() => {
    BrowserExtension.getTabs()
      .then((tabs) => {
        const activeTab = tabs.find((tab) => tab.active);
        if (activeTab) {
          setAlias(`${getName(activeTab.url)}${hash}@${emailDomain}`);
        }
      })
      .catch(() => {});
  }, []);

  const outboundAddress =
    isValidEmail(alias) && isValidEmail(recipient)
      ? buildOutboundAddress(alias, recipient)
      : null;

  return (
    <Form
      actions={
        <ActionPanel>
          {outboundAddress && (
            <Action.CopyToClipboard
              title="Copy Outbound Address"
              content={outboundAddress}
              icon={Icon.CopyClipboard}
              shortcut={{ modifiers: ["cmd"], key: "return" }}
            />
          )}
        </ActionPanel>
      }
    >
      <Form.TextField
        id="alias"
        title="Alias"
        placeholder="somecustomemail@px25.baylee.dev"
        value={alias}
        onChange={setAlias}
      />
      <Form.TextField
        id="recipient"
        title="To Recipient"
        placeholder="person@example.com"
        value={recipient}
        onChange={setRecipient}
      />
      {outboundAddress && (
        <Form.Description
          title="Outbound Address"
          text={outboundAddress}
        />
      )}
      {outboundAddress && (
        <Form.Description
          title=""
          text={`Send from your verified inbox to this address. Your relay will forward it to ${recipient} using ${alias} as the sender.`}
        />
      )}
    </Form>
  );
}
