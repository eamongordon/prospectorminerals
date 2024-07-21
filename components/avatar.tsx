import { forwardRef, useMemo, ForwardedRef } from "react";
import { AvatarIcon, useAvatar, AvatarProps } from "@nextui-org/react";
import Image, {type ImageProps} from "next/image";

interface CustomAvatarProps extends AvatarProps {
    alt?: string;
    height: ImageProps["height"];
    width: ImageProps["width"];
    quality?: ImageProps["quality"];
}

const CustomAvatar = forwardRef((props: CustomAvatarProps, ref: ForwardedRef<HTMLDivElement>) => {
    const {
        src,
        icon = <AvatarIcon />,
        alt,
        classNames,
        slots,
        name,
        showFallback,
        fallback: fallbackComponent,
        getInitials,
        getAvatarProps,
        getImageProps,
    } = useAvatar({
        ref,
        ...props,
    });
    const fallback = useMemo(() => {
        if (!showFallback && src) return null;
        const ariaLabel = alt || name || "avatar";
        if (fallbackComponent) {
            return (
                <div
                    aria-label={ariaLabel}
                    className={slots.fallback({ class: classNames?.fallback })}
                    role="img"
                >
                    {fallbackComponent}
                </div>
            );
        }
        return name ? (
            <span aria-label={ariaLabel} className={slots.name({ class: classNames?.name })} role="img">
                {getInitials(name)}
            </span>
        ) : (
            <span aria-label={ariaLabel} className={slots.icon({ class: classNames?.icon })} role="img">
                {icon}
            </span>
        );
    }, [showFallback, src, fallbackComponent, name, classNames]);

    return (
        <div {...getAvatarProps()}>
            {src && <Image {...getImageProps()} src={src} width={props.width} height={props.height} quality={props.quality} alt={alt} />}
            {fallback}
        </div>
    );
});

export default CustomAvatar;