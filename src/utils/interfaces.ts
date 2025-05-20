import { ReactNode } from "react";
import styles from '../../sass/CustomButton.module.scss';

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

// Ny hjälpkomponent för en rad i varukorgen
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
    eta: string; // This is the string from the API
    status?: string;
    totalPrice?: number;
}

export interface OrderResponse {
    order: OrderDetails;
    message?: string;
}
