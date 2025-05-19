import { ICuctomButtonProps } from "../../utils/interfaces";

export function CustomButton({ children, onClick, className, styles }: ICuctomButtonProps) {
    const buttonClassName = `${styles?.btn || ''} ${className || ''}`.trim();
    const pSmallClassName = styles?.pSmall || '';
    return (
        <button 
            type="button" 
            className={buttonClassName} 
            onClick={onClick}
        >
            <p className={pSmallClassName}>{children}</p>
        </button>
    );
}
