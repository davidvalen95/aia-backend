export interface KeyValueInterface {
    id?: number;
    value?: any,
    key: string,
    order?: number,
    originJson?: any;
    isHidden?: boolean;
    url?: string;
    image?: string;
    isSelected?: boolean; //# for ion-checkbox
    onClick?: () => void; //# more purpose

}