import Header1 from "./components/Header1";
import FirstLine from "./components/FirstLine";
import SideBySideBlock from "./components/SideBySideBlock";
import Text from "./components/Text";
import s from "./page.module.scss";
import DonnaGloriaSvg from "./assets/donna_gloria.svg";
import DonnaGloriaMobileSvg from "./assets/donna_gloria_mobile.svg";
import Illustration2Svg from "./assets/illustration_2.svg";
import Illustration2MobileSvg from "./assets/illustration_2_mobile.svg";
import Illustration3Svg from "./assets/illustration_3.svg";
import Illustration4Svg from "./assets/illustration_4.svg";
import Illustration5Svg from "./assets/illustration_5.svg";
import Illustration6Svg from "./assets/illustration_6.svg";
import Illustration7Svg from "./assets/illustration_7.svg";
import Illustration8Svg from "./assets/illustration_8.svg";
import Illustration9Svg from "./assets/illustration_9.svg";
import Illustration10Svg from "./assets/illustration_10.svg";
import Illustration11Svg from "./assets/illustration_11.svg";
import Illustration12Svg from "./assets/illustration_12.svg";
import Illustration3MobileSvg from "./assets/illustration_3_mobile.svg";
import Illustration4MobileSvg from "./assets/illustration_4_mobile.svg";
import Illustration5MobileSvg from "./assets/illustration_5_mobile.svg";
import Illustration6MobileSvg from "./assets/illustration_6_mobile.svg";
import Illustration8MobileSvg from "./assets/illustration_8_mobile.svg";
import Illustration11MobileSvg from "./assets/illustration_11_mobile.svg";
import BgGradientSvg from "./assets/bg_gradient.svg";
import DishSvg from "./assets/dish.svg";
import Photo01 from "./assets/photos/01.jpeg";
import Photo02 from "./assets/photos/02.jpeg";
import Photo03 from "./assets/photos/03.jpeg";
import Photo04 from "./assets/photos/04.jpeg";
import Photo05 from "./assets/photos/05.jpeg";
import Photo06 from "./assets/photos/06.jpeg";
import DonateButton from "./components/DonateButton";
import Numbers from "./components/Numbers";
import PhotoGallery from "./components/PhotoGallery";
import Quote from "./components/Quote";
import Space from "./components/Space";
import { DONATE_FORM_ANCHOR, DonateForm } from "./components/DonateForm";
import Map from "./components/Map";
import Header from "./components/Header";
import SvgAnimation from "./components/animation/SvgAnimation";
import ScrollDown from "./components/ScrollDown";
import React from "react";
import Footer from "./components/Footer";
import MobileSwap from "./components/MobileSwap";

export default function Page() {
  return (
    <>
      <div className={s.root}>
        <Header />
        <div className={s.black}>
          <div className={s.content}>
            <SideBySideBlock columnTemplate="560px auto" mobileReverse>
              <div>
                <Header1>Welcome to Health & Help</Header1>
                <FirstLine>
                  We are a&nbsp;women-led volunteer organization
                </FirstLine>
                <Text>
                  that transcends borders and&nbsp;empowers communities
                  by&nbsp;providing essential care to&nbsp;people in&nbsp;places
                  where resources are scarce and&nbsp;doctors even more so.
                </Text>
                <Text>
                  Together, we have established 2 clinics
                  in&nbsp;the&nbsp;remote villages of&nbsp;Guatemala
                  and&nbsp;Nicaragua.
                </Text>
                <ScrollDown>
                  <b>
                    <i>Scroll down to&nbsp;learn our story and...</i>
                  </b>
                </ScrollDown>
                <div style={{ marginTop: 48 }}>
                  <DonateButton href={`#${DONATE_FORM_ANCHOR}`}>
                    Become our sponsor
                  </DonateButton>
                </div>
              </div>
              <Numbers />
              <Map />
            </SideBySideBlock>
            <Space height={50} />
            <SideBySideBlock>
              <SvgAnimation>
                <MobileSwap
                  mobile={
                    <DonnaGloriaMobileSvg
                      className={[s.illustration, s.gloria].join(" ")}
                    />
                  }
                >
                  <DonnaGloriaSvg
                    className={[s.illustration, s.gloria].join(" ")}
                  />
                </MobileSwap>
              </SvgAnimation>
              <div>
                <Header1>This is Gloria</Header1>
                <FirstLine>Meet Donna Gloria, </FirstLine>
                <Text>
                  a resilient and hard-working woman living in
                  the&nbsp;picturesque{" "}
                  <b>village of Chuinajtajuyub, Guatemala</b>.
                </Text>
                <Text>
                  This village nestled amidst breathtaking mountains fosters
                  a&nbsp;close-knit community. However, she faces challenges
                  when it comes to&nbsp;accessing quality healthcare. Donna
                  Gloria with her big heart and&nbsp;even bigger family,
                  understands the&nbsp;struggles all too well.
                </Text>
                <Text>
                  <b>
                    To&nbsp;visit a&nbsp;doctor, she and&nbsp;her neighbours
                    have to&nbsp;travel far
                  </b>{" "}
                  and&nbsp;stand in long lines for&nbsp;hours, leaving them
                  vulnerable to the&nbsp;perils of&nbsp;inadequate healthcare.
                </Text>
              </div>
            </SideBySideBlock>
            <Space height={25} />
            <SideBySideBlock columnTemplate="auto 782px" gap={30} mobileReverse>
              <div>
                <FirstLine>Donna Gloria works as a&nbsp;cook,</FirstLine>
                <Text>
                  while her husband Juan works as a&nbsp;bus driver. Her
                  homemade tamales, banana ice&nbsp;cream, and tortillas are
                  beloved by&nbsp;her customers.
                </Text>
                <Text>
                  <b>
                    However, there is a&nbsp;hidden struggle behind her culinary
                    talents.
                  </b>{" "}
                  As&nbsp;she cooks over an&nbsp;open fire,&nbsp; Donna Gloria
                  often finds it difficult to&nbsp;breathe due to&nbsp;her
                  asthma. Yet, with an&nbsp;unwavering spirit, she faces each
                  day with a&nbsp;smile.
                </Text>
                <Text>
                  But deep down she knows that <b>there’s nothing she can do</b>{" "}
                  —&nbsp; as all&nbsp;doctors are far&nbsp;away from
                  her&nbsp;village and medications are always expensive.
                </Text>
              </div>
              <SvgAnimation>
                <MobileSwap
                  mobile={
                    <Illustration2MobileSvg
                      className={[s.illustration, s.illustration2].join(" ")}
                    />
                  }
                >
                  <Illustration2Svg
                    className={[s.illustration, s.illustration2].join(" ")}
                  />
                </MobileSwap>
              </SvgAnimation>
            </SideBySideBlock>
            <Space height={12} />
            <SideBySideBlock columnTemplate="713px auto">
              <SvgAnimation>
                <MobileSwap
                  mobile={<Illustration3MobileSvg className={[s.illustration, s.illustration3].join(" ")} />}
                >
                  <Illustration3Svg className={[s.illustration, s.illustration3].join(" ")} />
                </MobileSwap>
              </SvgAnimation>
              <div>
                <FirstLine>
                  Donna Gloria is not alone in&nbsp;her struggles.
                </FirstLine>
                <Text>
                  Her neighbours face countless obstacles too&nbsp;—
                  insufficient sanitation, scarce clean water,
                  and&nbsp;inadequate nutrition.
                </Text>
                <Text>
                  <b>
                    All of&nbsp;this has cast a&nbsp;dark shadow over their
                    lives
                  </b>
                  , leaving them vulnerable to&nbsp;preventable
                  and&nbsp;manageable illnesses.
                </Text>
              </div>
            </SideBySideBlock>
            <Space height={50} />
            <SideBySideBlock mobileReverse columnTemplate="760px auto">
              <div>
                <Header1>
                  We saw it all…
                  <br />
                  and started working
                </Header1>
                <Quote color="WHITE">
                  — This village is located at the&nbsp;intersection of several
                  roads in&nbsp;the&nbsp;middle of the&nbsp;wilderness, making
                  it a&nbsp;unique place that can be reached by&nbsp;people from
                  the&nbsp;4 departments – Kiche, Huehuetenango, Quetzaltenango
                  and Totonicapan.
                </Quote>
                <SideBySideBlock>
                  <div>
                    <Text>
                      <b>
                        When our founders, Vika and&nbsp;Karina, discovered this
                        village
                      </b>
                      , they immediately recognized the&nbsp;dire need
                      for&nbsp;medical support.
                    </Text>
                    <Text>
                      Determined to&nbsp;make a&nbsp;difference, they embarked
                      on a&nbsp;journey to&nbsp;establish the&nbsp;1st clinic
                      in&nbsp;Chuinajtajuyub.
                    </Text>
                  </div>
                  <div>
                    <Text>
                      <b>However, their path was not without challenges.</b>{" "}
                      Skepticism lingered among the villagers, unsure of the
                      impact this initiative could bring.
                    </Text>
                  </div>
                </SideBySideBlock>
              </div>
              <SvgAnimation>
                <MobileSwap
                  mobile={
                    <Illustration4MobileSvg
                      className={[s.illustration, s.illustration4].join(" ")}
                    />
                  }
                >
                  <Illustration4Svg
                    className={[s.illustration, s.illustration4].join(" ")}
                  />
                </MobileSwap>
              </SvgAnimation>
            </SideBySideBlock>
            <SideBySideBlock columnTemplate="765px auto" gap={40}>
              <SvgAnimation>
                <MobileSwap
                  mobile={
                    <Illustration5MobileSvg
                      className={[s.illustration, s.illustration5].join(" ")}
                    />
                  }
                >
                  <Illustration5Svg
                    className={[s.illustration, s.illustration5].join(" ")}
                  />
                </MobileSwap>
              </SvgAnimation>
              <div>
                <Header1>Gaining trust</Header1>
                <FirstLine>
                  The journey to build the clinic was not an easy one.
                </FirstLine>
                <Text>
                  But as days turned into weeks, the&nbsp;clinic’s construction
                  became a&nbsp;symbol of&nbsp;hope — an&nbsp;embodiment
                  of&nbsp;a&nbsp;future where healthcare would no&nbsp;longer be
                  an&nbsp;elusive dream{" "}
                  <b>
                    With the&nbsp;support of&nbsp;Donna Gloria, her husband, and
                    the entire village, the&nbsp;clinic gradually took shape.
                  </b>
                </Text>
                <Text>
                  Brick by brick, it stood as a&nbsp;testament to&nbsp;the
                  collective effort and&nbsp;belief in a&nbsp;better tomorrow.
                </Text>
                <DonateButton href={`#${DONATE_FORM_ANCHOR}`}>
                  Become our sponsor
                </DonateButton>
              </div>
            </SideBySideBlock>
            <Space height={20} />
            <SvgAnimation>
              <MobileSwap
                mobile={
                  <Illustration6MobileSvg
                    className={[s.illustration, s.illustration6].join(" ")}
                  />
                }
              >
                <Illustration6Svg
                  className={[s.illustration, s.illustration6].join(" ")}
                />
              </MobileSwap>
            </SvgAnimation>
            <Space height={100} />
            <SideBySideBlock columnTemplate="720px auto">
              <div>
                <Header1>Respecting the&nbsp;traditions</Header1>
                <FirstLine>
                  To&nbsp;earn the&nbsp;trust and acceptance of
                  the&nbsp;villagers, Vika and&nbsp;Karina embarked on
                  a&nbsp;mission to&nbsp;honor the&nbsp;local customs
                  and&nbsp;beliefs.
                </FirstLine>
                <SideBySideBlock>
                  <div>
                    <Text>
                      Together with the&nbsp;locals and with the&nbsp;assistance
                      of the&nbsp;mayor, we prepared the clinic for its launch,
                      but not&nbsp;without the&nbsp;community’s approval.
                    </Text>
                    <Text>
                      As a&nbsp;result, we arranged for the&nbsp;presence of
                      a&nbsp;revered shaman who would bless the&nbsp;clinic's
                      construction.
                    </Text>
                  </div>
                  <div>
                    <Text>
                      <b>
                        At a hallowed Mayan cemetery, a&nbsp;sacred ritual
                        unfolded
                      </b>
                      , accompanied by&nbsp;offerings of cocoa beans, corn,
                      candles, and alcohol.
                    </Text>
                    <Text>
                      All of which symbolized our deep respect for the beliefs,
                      traditions, and&nbsp;faith of the community.
                    </Text>
                  </div>
                </SideBySideBlock>
              </div>
              <SvgAnimation>
                <Illustration7Svg
                  className={[s.illustration, s.illustration7].join(" ")}
                />
              </SvgAnimation>
            </SideBySideBlock>
          </div>
        </div>
        <div className={s.white}>
          <div className={s.dishAndGradient}>
            <SvgAnimation>
              <DishSvg className={s.dish} />
            </SvgAnimation>
            <BgGradientSvg className={[s.bgGradient, s.bottom].join(" ")} />
          </div>
          <div className={s.content}>
            <SideBySideBlock gap={20} columnTemplate="760px auto" mobileReverse>
              <SvgAnimation>
                <MobileSwap
                  mobile={
                    <Illustration8MobileSvg
                      className={[s.illustration, s.illustration8].join(" ")}
                    />
                  }
                >
                  <Illustration8Svg
                    className={[s.illustration, s.illustration8].join(" ")}
                  />
                </MobileSwap>
              </SvgAnimation>
              <div>
                <Header1 style={{ color: "white" }}>The clinic is open</Header1>
                <FirstLine>
                  As the&nbsp;clinic's doors opened, a&nbsp;world
                  of&nbsp;possibilities unfolded before the&nbsp;village
                  of&nbsp;Chuinajtajuyub.
                </FirstLine>
                <Text>
                  Donna Gloria, her family, and&nbsp;countless others, now had
                  the&nbsp;vital access they desperately needed for&nbsp;medical
                  care. Their health and&nbsp;well-being were about to&nbsp;take
                  center stage as{" "}
                  <b>a&nbsp;new chapter began within the&nbsp;clinic’s walls</b>
                  .
                </Text>
              </div>
            </SideBySideBlock>
            <div>
              <Header1>The clinic’s first trial</Header1>
              <FirstLine>
                Despite Donna Gloria’s own struggles with asthma,
              </FirstLine>
            </div>
            <SideBySideBlock columnTemplate="auto 395px auto">
              <div>
                <Text>
                  she found solace in the&nbsp;care provided by&nbsp;dedicated
                  healthcare professionals.
                </Text>
                <Text>
                  However, when Juan her husband started experiencing
                  deteriorating health, Donna Gloria’s anxiety intensified.
                  Especially because if Juan were to&nbsp;lose his job as
                  a&nbsp;bus driver, their family would face hunger.
                </Text>
                <Text>
                  Fearing the&nbsp;worst, she urged him to&nbsp;visit
                  the&nbsp;newly established clinic. And when he did, her
                  intuition was correct and her worst fears confirmed, as&nbsp;
                  <b>Juan was diagnosed with&nbsp;diabetes</b>.
                </Text>
              </div>
              <SvgAnimation>
                <Illustration9Svg className={[s.illustration, s.illustration9].join(' ')} />
              </SvgAnimation>
              <div>
                <Text>
                  The weight of&nbsp;uncertainty burdened her, until
                  a&nbsp;glimmer of&nbsp;hope emerged.
                </Text>
                <Text>
                  Donna Gloria discovered that{" "}
                  <b>
                    the&nbsp;clinic provided the&nbsp;necessary treatment free
                    of&nbsp;charge
                  </b>
                  . In that moment, her fears dissipated, replaced by
                  a&nbsp;sense of&nbsp;relief and&nbsp;gratitude.
                </Text>
                <DonateButton href={`#${DONATE_FORM_ANCHOR}`}>
                  Become our sponsor
                </DonateButton>
              </div>
            </SideBySideBlock>
            <Space height={50} />
            <SideBySideBlock gap={20} columnTemplate="auto 484px">
              <div>
                <Header1 small>Life transformed by Health & Help</Header1>
                <FirstLine>
                  For many villagers, the clinic became their guardian of
                  well-being, empowering them to&nbsp;reclaim their lives.
                </FirstLine>
                <Text>
                  <b>
                    Routine checkups, medication they couldn’t afford before
                  </b>
                  , and&nbsp;even lifesaving treatments are now within
                  their&nbsp;reach.
                </Text>
                <Text>
                  And as for&nbsp;Donna Gloria, her health has significantly
                  improved. Sometimes she shows her appreciation
                  by&nbsp;bringing treats&nbsp; - tamales, banana ice cream,
                  and&nbsp;tortillas - as&nbsp;tokens of&nbsp;gratitude.
                </Text>
              </div>
              <SvgAnimation>
                <Illustration10Svg
                  className={[s.illustration, s.illustration10].join(" ")}
                />
              </SvgAnimation>
            </SideBySideBlock>
            <SideBySideBlock columnTemplate="680 auto" mobileReverse>
              <SvgAnimation>
                <MobileSwap
                  mobile={
                    <Illustration11MobileSvg
                      className={[s.illustration, s.illustration11].join(" ")}
                      style={{ marginLeft: "auto" }}
                    />
                  }
                >
                  <Illustration11Svg
                    className={[s.illustration, s.illustration11].join(" ")}
                    style={{ marginLeft: "auto" }}
                  />
                </MobileSwap>
              </SvgAnimation>
              <div>
                <FirstLine>Other times, she seeks care</FirstLine>
                <Text>
                  for&nbsp;her weary hands from kneading dough
                  or&nbsp;discomfort in&nbsp;her stomach.
                </Text>
                <Text>
                  <b>
                    Thanks to the&nbsp;clinic, she receives the&nbsp;necessary
                    treatment
                  </b>
                  , illuminating her life with&nbsp;renewed hope.
                </Text>
              </div>
            </SideBySideBlock>
            <Space height={50} />
            <SideBySideBlock gap={0} columnTemplate="auto 440px">
              <div>
                <Header1>Take action and follow the journey</Header1>
                <Quote color="BLACK">
                  <span>
                    — If it hadn't been for&nbsp;you, I don’t know what we
                    would&nbsp;do. Before you came, there were no&nbsp;doctors
                    here, <b>Domingo Sanchez</b>
                  </span>
                </Quote>
                <SideBySideBlock>
                  <div>
                    <Text>
                      <b>
                        Join us as&nbsp;we redefine the&nbsp;landscape
                        of&nbsp;compassion and care.
                      </b>
                    </Text>
                    <Text>
                      Your support can amplify our impact, extending
                      the&nbsp;reach of the&nbsp;clinic to&nbsp;neighbouring
                      villages where dozens of&nbsp;people, like Donna Gloria,
                      struggle to&nbsp;live to&nbsp;their fullest.
                    </Text>
                  </div>
                  <div>
                    <Text>
                      <b>Together, we can build a&nbsp;future</b> where
                      healthcare is a&nbsp;fundamental right and&nbsp;hope
                      flourishes.
                    </Text>
                    <Text>
                      <b>
                        <i>Be part of&nbsp;our journey today!</i>
                      </b>
                    </Text>
                    <ScrollDown>
                      Help us reach more people by&nbsp;sharing this story
                    </ScrollDown>
                  </div>
                </SideBySideBlock>
              </div>
              <SvgAnimation>
                <Illustration12Svg
                  className={[s.illustration, s.illustration12]}
                  style={{ marginTop: "30px" }}
                />
              </SvgAnimation>
            </SideBySideBlock>
            <DonateForm />
            <Header1>Health & Help in real life</Header1>
          </div>
        </div>
        <PhotoGallery
          images={[
            { image: Photo01, title: "Señora waiting in line" },
            {
              image: Photo02,
              title:
                "Our doctors seem to have found something surprising. Is it twins?",
            },
            {
              image: Photo06,
              title: "Donna Gloria in real life",
            },
            {
              image: Photo03,
              title:
                "Peace of mind for the mother - and a sweet treat for the kid",
            },
            {
              image: Photo04,
              title: "Hands down, the coolest way to pass time while queuing",
            },
            {
              image: Photo05,
              title:
                "When in doubt, we get a consult from other specialists in the clinic",
            },
          ]}
        />
      </div>
      <Footer />
    </>
  );
}
