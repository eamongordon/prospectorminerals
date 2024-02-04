"use client";

import { Tabs, Tab } from "@nextui-org/react";

export default function PostPageLayout({ editorElem, settingElem }: { editorElem: React.ReactElement, settingElem: React.ReactElement }) {
    return (
        <Tabs aria-label="Dynamic tabs">
            <Tab key={"editor"} title={"Editor"}>
                {editorElem}
            </Tab>
            <Tab key={"settings"} title={"Settings"}>
                {settingElem}
            </Tab>
        </Tabs>
    )
}