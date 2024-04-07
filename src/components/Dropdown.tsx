import * as DropdownMenu from "zeego/dropdown-menu";
import { RoundBtn } from "./RoundButton";

interface IDropdownItem {
  text: string;
  iosIcon?: string;
  androidIcon?: string;
}

interface IDropdownProps {
  triggerText?: string;
  items: IDropdownItem[];
}

export function Dropdown(props: IDropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <RoundBtn icon="ellipsis-horizontal" text={props.triggerText ?? "More"} />
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        {props.items.map((item) => (
          <DropdownMenu.Item key={item.text}>
            <DropdownMenu.ItemTitle>{item.text}</DropdownMenu.ItemTitle>
            <DropdownMenu.ItemIcon
              ios={{
                name: item.iosIcon,
                pointSize: 24,
              }}
              androidIconName={item.androidIcon}
            ></DropdownMenu.ItemIcon>
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
