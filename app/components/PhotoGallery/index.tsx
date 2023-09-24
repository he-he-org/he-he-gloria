"use client";
import s from "./index.module.scss";
import { useEffect, useRef, useState } from "react";

interface ImageInfo {
  src: string;
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

  const imagesRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (imagesRef.current) {
      const children = [...imagesRef.current?.children];
      let newOffset = 0;
      let j = -1;
      for (let i = 0; i < children.length; i++) {
        const imageEl = children[i];
        if (imageEl.classList.contains(REAL_IMAGE_MARKER_CLASS)) {
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
          style={{
            transform: `translateX(-${offset}px)`,
            transitionDuration: `${animationSpeed}ms`,
          }}
        >
          {/*{images.map((image, i) => (*/}
          {/*  <Img*/}
          {/*    isFake={true}*/}
          {/*    key={`${image.src}-fake-before`}*/}
          {/*    image={image}*/}
          {/*    onClick={() => {*/}
          {/*      setActive(i);*/}
          {/*    }}*/}
          {/*  />*/}
          {/*))}*/}
          {images.map((image, i) => (
            <Img
              key={image.src}
              image={image}
              isActive={i === active}
              onClick={() => {
                setActive(i);
              }}
            />
          ))}
          {/*{images.map((image, i) => (*/}
          {/*  <Img*/}
          {/*    isFake={true}*/}
          {/*    key={`${image.src}-fake-after`}*/}
          {/*    image={image}*/}
          {/*    onClick={() => {*/}
          {/*      setActive(i);*/}
          {/*    }}*/}
          {/*  />*/}
          {/*))}*/}
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
  isFake?: boolean;
  isActive?: boolean;
  onClick: () => void;
}) {
  const { src, title } = props.image;
  return (
    <div
      className={[
        s.imageContainer,
        props.isFake ? s.fake : REAL_IMAGE_MARKER_CLASS,
        props.isActive && s.isActive,
      ].join(" ")}
    >
      <img
        alt={`One of the photos from our clinics`}
        className={s.image}
        src={src}
        onClick={props.onClick}
      />
      <div className={s.imageTitle}>{title}</div>
    </div>
  );
}
