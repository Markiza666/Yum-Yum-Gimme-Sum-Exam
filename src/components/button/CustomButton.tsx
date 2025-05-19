import { ICuctomButtonProps } from "../../utils/interfaces";

export function CustomButton({ children, onClick, className, styles }: ICuctomButtonProps) {
    const buttonClassName = `${styles?.btn || ''} ${className || ''}`.trim();
    
    return (
        <button 
            type="button" 
            className={buttonClassName} 
            onClick={onClick}
        >
            {children}
        </button>
    );
}
