import { ReactNode } from "react";
import styles from '../../sass/CustomButton.module.scss';

export interface ApiKey {
    key: string;
}

export interface ApiComArgs {
    urlExtension: string;
    apiMethod: string;
    key: string;
    requestBody?: object;
}

export interface BadRequestError {
    status: 400;
    message: string;
}

export interface MenuItem {
    id: number;
    type: string;
    name: string;
    description: string;
    price: number;
    ingredients?: string[];
}

export interface MenuApiResponse {
    items: MenuItem[];
}

export interface MenuState {
    items: MenuItem[];
    loading: boolean;
    error: string | null;
}

export interface WontonItem {
    id: number;
    type: string;
    name: string;
    description: string;
    price: number;
    ingredients: string;
}

export  interface WholeMenu {
    items: MenuItem[];
}

export interface HeaderProps {
    hideVarukorg?: boolean;
    onCartClick: () => void;
}

export interface CartItem {
    id: number;
    quantity: number;
    name: string; 
    price: number;
}

export interface CartState {
    items: CartItem[];
}

export interface CartProps {
    onClose: () => void;
}

export interface CartItemRowProps {
    item: CartItem;
}

export interface ICuctomButtonProps {
    children: ReactNode;
    onClick: () => void;
    className?: string;
    styles?: typeof styles; 
    disabled?: boolean;
}

export interface OrderDetails {
    id?: string;
    eta: string; 
    status?: string;
    totalPrice?: number;
}

export interface OrderResponse {
    order: OrderDetails;
    message?: string;
}

export interface ReceiptData {
    receipt: {
        id: string;
        items: ReceiptItem[];
        orderValue: number;
        timestamp: string;
    }
};
export interface ReceiptItem {
    id: number;
    name: string;
    type: string;
    quantity: number;
    price: number;
}