"use client";
import s from "./index.module.scss";
import { useLayoutEffect, useState } from "react";
import AnimatedDigit from "./AnimatedDigit";
import ShowHide from "../animation/ShowHide";

const ANIMATION_TIME = 500;
const DIGITS_ANIMATION_TIME = 1000;
interface Props {}

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

export default function Numbers() {
  const [volunteersCount, setVolunteersCount] = useState(0);
  const [countriesCount, setCountriesCount] = useState(0);
  const [clinicsCount, setClinicsCount] = useState(0);

  const [showVolunteersCount, setShowVolunteersCount] = useState(false);
  const [showCountriesCount, setShowCountriesCount] = useState(false);
  const [showClinicsCount, setShowClinicsCount] = useState(false);

  const [showVolunteersTitle, setShowVolunteersTitle] = useState(false);
  const [showCountriesTitle, setShowCountriesTitle] = useState(false);
  const [showClinicsTitle, setShowClinicsTitle] = useState(false);

  useLayoutEffect(() => {
    async function job() {
      // setStarted(true)
      setShowVolunteersCount(true);
      await sleep(200);
      setVolunteersCount(145);
      await sleep(DIGITS_ANIMATION_TIME - 200);
      setShowVolunteersTitle(true);
      // await sleep(ANIMATION_TIME);

      setShowCountriesCount(true);
      await sleep(200);
      setCountriesCount(36);
      await sleep(DIGITS_ANIMATION_TIME - 200);
      setShowCountriesTitle(true);

      setShowClinicsCount(true);
      await sleep(200);
      setClinicsCount(2);
      await sleep(DIGITS_ANIMATION_TIME - 200);
      setShowClinicsTitle(true);
    }
    job().catch((e) => {
      console.error(e);
    });
  }, []);

  return (
    <div className={s.root}>
      <div className={s.top}>
        <ShowHide
          animationTime={ANIMATION_TIME}
          isVisible={showVolunteersCount}
        >
          {(props) => (
            <div className={s.red} {...props}>
              <Value value={volunteersCount} />
              <ShowHide
                animationTime={ANIMATION_TIME}
                isVisible={showVolunteersTitle}
              >
                {(props) => (
                  <div className={s.title} {...props}>
                    volunteers
                  </div>
                )}
              </ShowHide>
            </div>
          )}
        </ShowHide>
        <ShowHide animationTime={ANIMATION_TIME} isVisible={showCountriesCount}>
          {(props) => (
            <div className={s.white} {...props}>
              <Value value={countriesCount} />
              <ShowHide
                animationTime={ANIMATION_TIME}
                isVisible={showCountriesTitle}
              >
                {(props) => (
                  <div className={s.title} {...props}>
                    countries
                  </div>
                )}
              </ShowHide>
            </div>
          )}
        </ShowHide>
      </div>
      <div className={s.bottom}>
        <ShowHide animationTime={ANIMATION_TIME} isVisible={showClinicsCount}>
          {(props) => (
            <div className={s.white} {...props}>
              <Value value={clinicsCount} />
              <ShowHide
                animationTime={ANIMATION_TIME}
                isVisible={showClinicsTitle}
              >
                {(props) => (
                  <div className={s.title} {...props}>
                    clinics
                  </div>
                )}
              </ShowHide>
            </div>
          )}
        </ShowHide>
      </div>
    </div>
  );
}

function Value(props: { value: number }) {
  const { value } = props;
  return (
    <div className={s.value}>
      <AnimatedDigit
        value={Math.floor(value / 100)}
        maxValue={9}
        animationTime={DIGITS_ANIMATION_TIME}
      />
      <AnimatedDigit
        value={Math.floor((value % 100) / 10)}
        maxValue={9}
        animationTime={DIGITS_ANIMATION_TIME}
      />
      <AnimatedDigit
        value={Math.floor((value % 100) % 10)}
        maxValue={9}
        showZero={true}
        animationTime={DIGITS_ANIMATION_TIME}
      />
    </div>
  );
}
