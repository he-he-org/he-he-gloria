"use client";
import s from "./index.module.scss";
import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "../../helpers/browser";
import Image, { StaticImageData } from "next/image";

interface ImageInfo {
  image: StaticImageData;
  title: string;
}

interface Props {
  images: ImageInfo[];
}

const REAL_IMAGE_MARKER_CLASS = "REAL_IMAGE_MARKER_CLASS";

export default function PhotoGallery(props: Props) {
  const { images } = props;
  const [active, setActive] = useState(2);
  const [offset, setOffset] = useState(0);
  const [offsetDif, setOffsetDif] = useState(0);

  const isMobile = useIsMobile();
  const imagesRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (imagesRef.current) {
      const children = [...imagesRef.current?.children];
      let newOffset = 0;
      let j = -1;
      for (let i = 0; i < children.length; i++) {
        const imageEl = children[i];
        if (imageEl.classList.contains(s.imageContainer)) {
          j++;
        }
        if (j === active) {
          newOffset += imageEl.clientWidth / 2;
          break;
        } else {
          newOffset += imageEl.clientWidth;
        }
      }
      setOffsetDif(offset - newOffset);
      setOffset(newOffset);
    }
  }, [active]);

  const animationSpeed = Math.abs(offsetDif) / 3;
  return (
    <div className={s.root}>
      <div className={s.imagesContainer}>
        <div
          ref={imagesRef}
          className={s.images}
          style={
            isMobile
              ? undefined
              : {
                  transform: `translateX(-${offset}px)`,
                  transitionDuration: `${animationSpeed}ms`,
                }
          }
        >
          {images.map((image, i) => (
            <Img
              key={image.image.src}
              image={image}
              isActive={i === active}
              onClick={() => {
                setActive(i);
              }}
            />
          ))}
        </div>
      </div>
      <div className={s.controls}>
        {[...new Array(images.length)].map((_, i) => (
          <button
            className={i === active ? s.isActive : undefined}
            key={i}
            onClick={() => {
              setActive(i);
            }}
          ></button>
        ))}
      </div>
    </div>
  );
}

function Img(props: {
  image: ImageInfo;
  isActive?: boolean;
  onClick: () => void;
}) {
  const { image, title } = props.image;
  return (
    <div
      className={[
        s.imageContainer,
        props.isActive && s.isActive,
      ].join(" ")}
    >
      <Image
        className={s.image}
        src={image}
        alt={`One of the photos from our clinics`}
        onClick={props.onClick}
      />
      <div className={s.imageTitle}>{title}</div>
    </div>
  );
}
