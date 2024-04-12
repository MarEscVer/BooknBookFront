import { IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";

export interface MenuItem {
    routerLink: string;
    iconName: IconName;
    iconPrefix: IconPrefix;
    tooltipText: string;
}
