import {
  Action,
  ActionPanel,
  BrowserExtension,
  Form,
  getPreferenceValues,
  Icon,
} from "@raycast/api";
import { useEffect, useState } from "react";
import { generateRandomHex, getName } from "./util";

interface Preferences {
  emailDomain: string;
}

export default function Command() {
  const { emailDomain } = getPreferenceValues<Preferences>();
  const [hash] = useState(() => generateRandomHex(4));
  const [service, setService] = useState<string>("");

  useEffect(() => {
    BrowserExtension.getTabs()
      .then((tabs) => {
        const activeTab = tabs.find((tab) => tab.active);
        if (activeTab) {
          setService(`${getName(activeTab.url)}${hash}`);
        }
      })
      .catch(() => {});
  }, []);

  const alias = service ? `${service}@${emailDomain}` : null;

  return (
    <Form
      actions={
        <ActionPanel>
          {alias && (
            <Action.CopyToClipboard
              title="Copy Alias"
              content={alias}
              icon={Icon.CopyClipboard}
            />
          )}
        </ActionPanel>
      }
    >
      <Form.TextField
        id="service"
        title="Service"
        placeholder="github"
        value={service}
        onChange={setService}
      />
      {alias && (
        <Form.Description
          title="Inbound Alias"
          text={alias}
        />
      )}
    </Form>
  );
}
