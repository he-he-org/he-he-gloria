import Header1 from "./components/Header1";
import FirstLine from "./components/FirstLine";
import SideBySideBlock from "./components/SideBySideBlock";
import Text from "./components/Text";
import s from "./page.module.scss";
import DonnaGloriaSvg from "./assets/donna_gloria.svg";
import Illustration2Svg from "./assets/illustration_2.svg";
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
import BgGradientSvg from "./assets/bg_gradient.svg";
import DishSvg from "./assets/dish.svg";
import Photo01 from "./assets/photos/01.jpeg";
import Photo02 from "./assets/photos/02.jpeg";
import Photo03 from "./assets/photos/03.jpeg";
import Photo04 from "./assets/photos/04.jpeg";
import Photo05 from "./assets/photos/05.jpeg";
import DonateButton from "./components/DonateButton";
import Numbers from "./components/Numbers";
import PhotoGallery from "./components/PhotoGallery";

export default function Page() {
  return (
    <div className={s.root}>
      <div className={s.black}>
        <div className={s.content}>
          <SideBySideBlock columnTemplate="560px auto">
            <div>
              <Header1>Welcome to Health & Help</Header1>
              <FirstLine>We are a&nbsp;charity </FirstLine>
              <Text>
                that transcends borders and empowers communities
                by&nbsp;providing essential care to&nbsp;people in&nbsp;places
                where resources are scarce and&nbsp;doctors even more so.
              </Text>
              <Text>
                Together, we have established 2 clinics in&nbsp;the&nbsp;remote
                villages of&nbsp;Guatemala and&nbsp;Nicaragua.
              </Text>
              <div style={{ marginTop: 48 }}>
                <DonateButton>Become our sponsor</DonateButton>
              </div>
            </div>
            <Numbers />
          </SideBySideBlock>
          <SideBySideBlock>
            <div>
              <DonnaGloriaSvg />
            </div>
            <div>
              <Header1>This is Gloria</Header1>
              <FirstLine>Meet Donna Gloria, </FirstLine>
              <Text>
                a resilient and hard-working woman living in
                the&nbsp;picturesque village of Chuinajtajuyub, Guatemala. This
                village nestled amidst breathtaking mountains fosters
                a&nbsp;close-knit community. However, faces challenges when it
                comes to&nbsp;accessing quality healthcare. Donna Gloria with
                her big heart and&nbsp;even bigger family, understands
                the&nbsp;struggles all too well. To&nbsp;visit a&nbsp;doctor,
                she and&nbsp;her neighbours have to&nbsp;travel far
                and&nbsp;stand in long lines for&nbsp;hours, leaving them
                vulnerable to the&nbsp;perils of&nbsp;inadequate healthcare.
              </Text>
            </div>
          </SideBySideBlock>
          <SideBySideBlock>
            <div>
              <FirstLine>Donna Gloria works as a&nbsp;cook,</FirstLine>
              <Text>
                while her husband Juan works as a&nbsp;bus driver. Her homemade
                tamales, banana ice&nbsp;cream, and tortillas are beloved
                by&nbsp;her customers. However, there is a&nbsp;hidden struggle
                behind her culinary talents. As&nbsp;she cooks over an&nbsp;open
                fire,&nbsp; Donna Gloria often finds it difficult
                to&nbsp;breathe due to&nbsp;her asthma. Yet, with
                an&nbsp;unwavering spirit, she faces each day with a&nbsp;smile.
                But deep down she knows that there’s nothing she can do —&nbsp;
                as all&nbsp;doctors are far&nbsp;away from her&nbsp;village and
                medications are always expensive.
              </Text>
            </div>
            <Illustration2Svg />
          </SideBySideBlock>
          <SideBySideBlock>
            <Illustration3Svg />
            <div>
              <FirstLine>
                Donna Gloria is not alone in&nbsp;her struggles.
              </FirstLine>
              <Text>
                Her neighbours face countless obstacles too&nbsp;— insufficient
                sanitation, scarce clean water, and&nbsp;inadequate nutrition.
                All of&nbsp;this has cast a&nbsp;dark shadow over their lives,
                leaving them vulnerable to&nbsp;preventable and&nbsp;manageable
                illnesses.
              </Text>
            </div>
          </SideBySideBlock>
          <SideBySideBlock>
            <div>
              <Header1>We saw it all … and started working</Header1>
              <blockquote>
                — This village is located at the&nbsp;intersection of several
                roads in&nbsp;the&nbsp;middle of the&nbsp;wilderness, making it
                a&nbsp;unique place that can be reached by&nbsp;people from
                the&nbsp;3 nearby villages - Kiche, Hueuetenango, and
                Totonicapan.
              </blockquote>
              <Text>
                When our founders, Vika and&nbsp;Karina, discovered this
                village, they immediately recognized the&nbsp;dire need
                for&nbsp;medical support. Determined to&nbsp;make
                a&nbsp;difference, they embarked on a&nbsp;journey
                to&nbsp;establish the&nbsp;1st clinic in&nbsp;Chuinajtajuyub.
              </Text>
              <Text>
                However, their path was not without challenges. Skepticism
                lingered among the villagers, unsure of the impact this
                initiative could bring.
              </Text>
            </div>
            <Illustration4Svg />
          </SideBySideBlock>
          <SideBySideBlock>
            <Illustration5Svg />
            <div>
              <Header1>Gaining trust</Header1>
              <FirstLine>
                The journey to build the clinic was not an easy one.
              </FirstLine>
              <Text>
                But as days turned into weeks, the&nbsp;clinic’s construction
                became a&nbsp;symbol of&nbsp;hope — an&nbsp;embodiment
                of&nbsp;a&nbsp;future where healthcare is no&nbsp;longer
                an&nbsp;elusive dream. With the&nbsp;support of&nbsp;Donna
                Gloria, her husband, and the entire village, the&nbsp;clinic
                gradually took shape. Brick by brick, it stood as
                a&nbsp;testament to&nbsp;the collective effort and&nbsp;belief
                in a&nbsp;better tomorrow.
              </Text>
            </div>
          </SideBySideBlock>
          <Illustration6Svg />
          <SideBySideBlock>
            <div>
              <Header1>Respecting the traditions</Header1>
              <FirstLine>
                To&nbsp;earn the&nbsp;trust and acceptance of
                the&nbsp;villagers, Vika and&nbsp;Karina embarked on
                a&nbsp;mission to&nbsp;honor the&nbsp;local customs
                and&nbsp;beliefs.
              </FirstLine>
              <Text>
                Together with the&nbsp;locals and with the&nbsp;assistance of
                the&nbsp;mayor, we prepared the clinic for its launch, but
                not&nbsp;without the&nbsp;community’s approval. As
                a&nbsp;result, we arranged for the&nbsp;presence of
                a&nbsp;revered shaman who would bless the&nbsp;clinic's
                construction.
              </Text>
              <Text>
                At a hallowed Mayan cemetery, a&nbsp;sacred ritual unfolded,
                accompanied by&nbsp;offerings of cocoa beans, corn, candles, and
                alcohol. All of which symbolized our deep respect for the
                beliefs, traditions, and&nbsp;faith of the community.
              </Text>
            </div>
            <Illustration7Svg />
          </SideBySideBlock>
        </div>
        {/*<BgGradientSvg className={[s.bgGradient, s.top].join(' ')} />*/}
        {/*<PaymentForm />*/}
      </div>
      <div className={s.white}>
        <div className={s.dishAndGradient}>
          <DishSvg className={s.dish} />
          <BgGradientSvg className={[s.bgGradient, s.bottom].join(" ")} />
        </div>
        <div className={s.content}>
          <SideBySideBlock>
            <Illustration8Svg />
            <div>
              <Header1>The clinic is open</Header1>
              <FirstLine>
                As the&nbsp;clinic's doors opened, a&nbsp;world
                of&nbsp;possibilities unfolded before the&nbsp;village
                of&nbsp;Chuinajtajuyub.
              </FirstLine>
              <Text>
                Donna Gloria, her family, and&nbsp;countless others, now had
                the&nbsp;vital access they desperately needed for&nbsp;medical
                care. Their health and&nbsp;well-being were about to&nbsp;take
                center stage as a&nbsp;new chapter began within
                the&nbsp;clinic’s walls.
              </Text>
            </div>
          </SideBySideBlock>
          <SideBySideBlock>
            <div>
              <Header1>The clinic’s first trial</Header1>
              <FirstLine>
                Despite Donna Gloria’s own struggles with asthma,
              </FirstLine>
              <Text>
                she found solace in the&nbsp;care provided by&nbsp;dedicated
                healthcare professionals. However, when Juan her husband started
                experiencing deteriorating health, Donna Gloria’s anxiety
                intensified. Especially because if Juan were to&nbsp;lose his
                job as a&nbsp;bus driver, their family would face hunger.
                Fearing the&nbsp;worst, she urged him to&nbsp;visit
                the&nbsp;newly established clinic. And when he did, her
                intuition was correct and her worst fears confirmed,
                as&nbsp;Juan was diagnosed with&nbsp;diabetes.
              </Text>
              <Text>
                The weight of&nbsp;uncertainty burdened her, until
                a&nbsp;glimmer of&nbsp;hope emerged. Donna Gloria discovered
                that the&nbsp;clinic provided the&nbsp;necessary treatment free
                of&nbsp;charge. In that moment, her fears dissipated, replaced
                by a&nbsp;sense of&nbsp;relief and&nbsp;gratitude.
              </Text>
            </div>
            <Illustration9Svg />
          </SideBySideBlock>
          <SideBySideBlock>
            <div>
              <Header1>Life transformed by Health & Help</Header1>
              <FirstLine>
                For many villagers, the clinic became their guardian of
                well-being, empowering them to&nbsp;reclaim their lives.
              </FirstLine>
              <Text>
                Routine checkups, medication they couldn’t afford before,
                and&nbsp;even lifesaving treatments are now within
                their&nbsp;reach. And as for&nbsp;Donna Gloria, her health has
                significantly improved. Sometimes she shows her appreciation
                by&nbsp;bringing treats&nbsp; - tamales, banana ice cream,
                and&nbsp;tortillas - as&nbsp;tokens of&nbsp;gratitude.
              </Text>
            </div>
            <Illustration10Svg />
          </SideBySideBlock>
          <SideBySideBlock>
            <Illustration11Svg />
            <div>
              <FirstLine>Other times, she seeks care</FirstLine>
              <Text>
                for&nbsp;her weary hands from kneading dough or&nbsp;discomfort
                in&nbsp;her stomach. Thanks to the&nbsp;clinic, she receives
                the&nbsp;necessary treatment, illuminating her life
                with&nbsp;renewed hope.
              </Text>
            </div>
          </SideBySideBlock>
          <SideBySideBlock>
            <div>
              <Header1>Take action and follow the journey</Header1>
              <blockquote>
                — If it hadn't been for&nbsp;you, I don’t know what we
                would&nbsp;do. Before you came, there were no&nbsp;doctors here,
                Domingo Sanchez
              </blockquote>
              <FirstLine>
                For many villagers, the clinic became their guardian of
                well-being, empowering them to&nbsp;reclaim their lives.
              </FirstLine>
              <Text>
                Join us as&nbsp;we redefine the&nbsp;landscape
                of&nbsp;compassion and care. Your support can amplify our
                impact, extending the&nbsp;reach of the&nbsp;clinic
                to&nbsp;neighbouring villages where dozens of&nbsp;people, like
                Donna Gloria, struggle to&nbsp;live to&nbsp;their fullest.
              </Text>
              <Text>
                Together, we can build a&nbsp;future where healthcare is
                a&nbsp;fundamental right and&nbsp;hope flourishes. Be part
                of&nbsp;our journey today!
              </Text>
            </div>
            <Illustration12Svg />
          </SideBySideBlock>
          <Header1>Health & Help in real life</Header1>
        </div>
      </div>
      <PhotoGallery
        images={[
          { src: Photo01.src, title: "Señora waiting in line (Photo01)" },
          { src: Photo02.src, title: "Señora waiting in line (Photo02)" },
          { src: Photo03.src, title: "Señora waiting in line (Photo03)" },
          { src: Photo04.src, title: "Señora waiting in line (Photo04)" },
          { src: Photo05.src, title: "Señora waiting in line (Photo05)" },
        ]}
      />
    </div>
  );
}

function DonnaGloriaReact() {
  return <></>;
}
