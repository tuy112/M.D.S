'use client'; 

import { useState } from 'react';
import Header from '@/app/components/header/Header';
import Footer from '@/app/components/footer/Footer';
import styles from './style.module.css';

const subChoices = {
  A:{
    title:'[A] 마운드 방문 - 누가 갈까?',
    options:[
      {id:'A-1',text:'포수만 올라감',desc:'사인 점검, 부담 적은 방문'},
      {id:'A-2',text:'투수코치 마운드 방문',desc:'기술 조언 + 불펜 시간 확보'},
      {id:'A-3',text:'감독이 직접 방문',desc:'강력한 메시지, 분위기 환기'}
    ]
  },
  B:{
    title:'[B] 투수 교체 - 누구로?',
    options:[
      {id:'B-1',text:'최지민 (좌완)',desc:'vs김재환 .143⭐ · 만루 ERA 2.84'},
      {id:'B-2',text:'전상현 (우완)',desc:'vs라모스 .375 · 만루 ERA 4.12 ⚠'},
      {id:'B-3',text:'곽도규 (우완)',desc:'3연투 후 컨디션 우려 ⚠'}
    ]
  },
  C:{
    title:'[C] 고의4구 → 김재환 승부',
    options:[
      {id:'C-1',text:'이준영 그대로 김재환',desc:'vs김재환 .250 · 만루 .312'},
      {id:'C-2',text:'최지민으로 교체',desc:'vs김재환 .143⭐ · 헨리 대타 위험 ⚠'}
    ]
  },
  D:{
    title:'[D] 수비 강화',
    options:[
      {id:'D-1',text:'내야 인필드 백',desc:'병살 노림'},
      {id:'D-2',text:'내야 전진수비',desc:'적시타 차단'},
      {id:'D-3',text:'외야 라인업',desc:'장타 차단'}
    ]
  }
};

const results = {
  'A-1':{choice:'[A-1] 포수만 방문 + 이준영 유지',result:'→ 2실점 (실제 결과와 동일)',points:'65/100'},
  'A-2':{choice:'[A-2] 투수코치 방문 + 이준영 유지',result:'→ 무실점, 위기 탈출',points:'72/100'},
  'A-3':{choice:'[A-3] 감독 직접 방문 + 이준영 유지',result:'→ 1실점',points:'60/100'},
  'B-1':{choice:'[B-1] 최지민으로 교체',result:'→ 무실점, 위기 탈출',points:'88/100'},
  'B-2':{choice:'[B-2] 전상현으로 교체',result:'→ 2실점',points:'38/100'},
  'B-3':{choice:'[B-3] 곽도규로 교체',result:'→ 2실점',points:'32/100'},
  'C-1':{choice:'[C-1] 고의4구 + 이준영',result:'→ 2실점',points:'48/100'},
  'C-2':{choice:'[C-2] 고의4구 + 최지민',result:'→ 4실점',points:'35/100'},
  'D-1':{choice:'[D-1] 내야 인필드 백',result:'→ 무실점',points:'78/100'},
  'D-2':{choice:'[D-2] 내야 전진수비',result:'→ 2실점',points:'42/100'},
  'D-3':{choice:'[D-3] 외야 라인업',result:'→ 2실점',points:'38/100'}
};

export default function Home() {

  const [page,setPage] = useState<'question'|'sub'|'result'>('question');
  const [mainChoice,setMainChoice] = useState<'A'|'B'|'C'|'D'|null>(null);
  const [finalChoice,setFinalChoice] = useState<string | null>(null);

  const moveSubPage = (choice:'A'|'B'|'C'|'D') => {
    setMainChoice(choice);
    setPage('sub');
  };

  const moveResultPage = (choiceId:string) => {
    setFinalChoice(choiceId);
    setPage('result');
  };

  if(page === 'sub' && mainChoice){
    return (
      <main className={styles.container}>
        <div className={styles.header}>
          <h2>{subChoices[mainChoice].title}</h2>
        </div>

        <div className={styles.content}>
          {subChoices[mainChoice].options.map(option => (
            <button
              key={option.id}
              className={styles.choiceButton}
              onClick={() => moveResultPage(option.id)}
            >
              <strong>{option.text}</strong>
              <span>{option.desc}</span>
            </button>
          ))}

          <button
            className={styles.backButton}
            onClick={() => setPage('question')}
          >
            뒤로가기
          </button>
        </div>
      </main>
    );
  }

  if(page === 'result' && finalChoice){
    const result = results[finalChoice as keyof typeof results];

    return (
      <main className={styles.container}>
        <div className={styles.header}>
          <h2>선택 결과</h2>
        </div>

        <div className={styles.resultCard}>
          <h3>{result.choice}</h3>
          <p>{result.result}</p>
          <div className={styles.pointBox}>
            점수 {result.points}
          </div>
        </div>

        <button
          className={styles.primaryButton}
          onClick={() => setPage('question')}
        >
          다시하기
        </button>
      </main>
    );
  }

  return (
    <div className={styles.wrap}>
        
        {/* header */}
        <Header/>
        
        {/* main */}
        <main className={styles.container}>
            
            {/* main - mainHeader */}
            <div className={styles.mainHeader}>
                <div className={styles.mainHeaderTitle}>DUGOUT · 덕아웃 선택 #1</div>
                <h1 className={styles.mainHeaderTxt}>2024.08.17 광주 · 7회초</h1>
            </div>

            {/* main - score card */}
            <div className={styles.scoreSpace}>
              <div className={styles.scoreCard}>
                
                <div className={styles.scoreLeft}>
                  <div className={styles.scoreRow}>
                    <div className={styles.teamName}>
                      <span className={`${styles.teamDot} ${styles.red}`}></span>
                      두산
                    </div>
                    <strong>4</strong>
                  </div>

                  <div className={styles.scoreRow}>
                    <div className={styles.teamName}>
                      <span className={`${styles.teamDot} ${styles.blue}`}></span>
                      KIA
                    </div>
                    <strong>3</strong>
                  </div>

                  <div className={styles.inning}>
                    7회초 ▲
                  </div>
                </div>

                <div className={styles.diamondContainer}>
                  <div className={styles.diamond}></div>
                  <div className={`${styles.base} ${styles.second} ${styles.runner}`}></div>
                  <div className={`${styles.base} ${styles.third}`}></div>
                  <div className={`${styles.base} ${styles.first} ${styles.runner}`}></div>
                  <div className={`${styles.base} ${styles.home}`}></div>
                </div>
              </div>

              <div className={styles.outs}>
                <span className={styles.outCircles}>
                  <span className={`${styles.outCircle} ${styles.on}`}></span>
                  <span className={styles.outCircle}></span>
                  <span className={styles.outCircle}></span>
                </span>
                1사 · 1·2루
              </div>
            </div>

            {/* main - question box */}
            <div className={styles.questionPrompt}>
                <div className={styles.questionTeam}>🔵 기아 덕아웃!</div>
                <div className={styles.questionSituation}>1사 1·2루 위기입니다</div>
                <div className={styles.questionMain}>코칭스태프!<br/>어떤 결정을 하실껀가요?</div>
            </div>

            {/* main - batter card */}
            {/* 두산 공격 */}
            <div className={styles.cardSection}>
                <div className={styles.sectionHeader + ' ' + styles.away}>
                    <p>🔴 두산 공격</p>
                </div>
                
                <div className={styles.batterCard}>
                    <div className={styles.batterTitle}>
                        🎯 라모스 (우타)
                        <span className={styles.badge}>4번 · 3타석째</span>
                    </div>
                    <div className={styles.todayRecord}>오늘: 플라이 → 안타 → ?</div>
                    <div className={styles.statRow}>시즌 <strong>.295</strong> · vs좌 <strong>.267</strong> · vs우 <strong>.312</strong></div>
                    <div className={styles.statRow}>1·2루 <strong>.322</strong> · 만루 <strong>.375</strong></div>
                </div>
                
                <div className={styles.lineup}>
                    <div className={styles.lineupTitle}>두산 타순 · 대타</div>
                
                    <div className={styles.playerRow}>
                        <div className={styles.playerNum}>5</div>
                        <div className={styles.playerInfo}>
                            <div className={styles.name}>김재환 (좌타)</div>
                            <div className={styles.stats}>.283 · vs좌 .241 · vs우 .295 · 만루 .312</div>
                        </div>
                    </div>
                
                    <div className={styles.playerRow}>
                        <div className={styles.playerNum}>6</div>
                        <div className={styles.playerInfo}>
                            <div className={styles.name}>양의지 (우타)</div>
                            <div className={styles.stats}>.276 · vs좌 .291 · vs우 .268 · 만루 .345</div>
                        </div>
                    </div>
                
                    <div className={styles.playerRow}>
                        <div className={styles.playerNum + ' ' + styles.pinch}>PH</div>
                        <div className={styles.playerInfo}>
                            <div className={styles.name}>헨리 (우타) <span className={styles.warn}>⚠</span></div>
                            <div className={styles.stats}>대타 .310 · 만루 <strong style={{ color: '#dc2626' }}>.400</strong></div>
                        </div>
                    </div>
                
                    <div className={styles.playerRow}>
                        <div className={styles.playerNum + ' ' + styles.pinch}>PH</div>
                        <div className={styles.playerInfo}>
                        <div className={styles.name}>안재석 (좌타)</div>
                        <div className={styles.stats}>대타 .268 · 만루 .310</div>
                        </div>
                    </div>
                
                    <div className={styles.playerRow}>
                        <div className={styles.playerNum + ' ' + styles.pinch}>PH</div>
                        <div className={styles.playerInfo}>
                            <div className={styles.name}>김재호 (우타)</div>
                            <div className={styles.stats}>대타 .258 · 만루 .290</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* main - pitcher card */}
            <div className={styles.cardSection}>
                <div className={styles.sectionHeader + ' ' + styles.home}>
                    <p>🔵 KIA 수비</p>
                </div>
                
                <div className={styles.pitcherCard}>
                    <div className={styles.pitcherName}>🎯 이준영 (좌완)</div>
                    <div className={styles.pitcherStatus}>6회 1사 등판, 12구<br/>플라이(김재환,좌) → 안타(양석환,우) → 볼넷(강승호,우) <span className={styles.warn}>⚠ 흔들림</span></div>
                    <div className={styles.statRow}>ERA <strong>3.42</strong> · 12홀드 · vs좌 <strong>.198</strong> · vs우 <strong>.278</strong></div>
                    <div className={styles.statRow}>1·2루 <strong>.295</strong> · 만루 <strong>.312</strong></div>
                </div>
                
                <div className={styles.lineup}>
                    <div className={styles.lineupTitle}>KIA 투수진 (상대 타자 vs 전적)</div>
                        <table className={styles.bullpenTable}>
                            <thead>
                                <tr>
                                    <th>투수</th>
                                    <th>라모스</th>
                                    <th>김재환</th>
                                    <th>양의지</th>
                                    <th>헨리</th>
                                    <th>만루ERA</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr className={styles.current}>
                                <td>이준영(좌)</td>
                                <td>.333</td>
                                <td>.250</td>
                                <td>.312</td>
                                <td>.333</td>
                                <td>3.12</td>
                            </tr>
                            <tr>
                                <td>최지민(좌)</td>
                                <td>.333</td>
                                <td className={styles.star}>.143⭐</td>
                                <td>.267</td>
                                <td>.500</td>
                                <td>2.84</td>
                            </tr>
                            <tr>
                                <td>전상현(우)</td>
                                <td className={styles.warn}>.375</td>
                                <td className={styles.warn}>.400</td>
                                <td>.289</td>
                                <td>.500</td>
                                <td className={styles.warn}>4.12</td>
                            </tr>
                            <tr>
                                <td>곽도규(우)</td>
                                <td className={styles.warn}>.500</td>
                                <td>.333</td>
                                <td>.250</td>
                                <td>.333</td>
                                <td>3.45</td>
                            </tr>
                            <tr>
                                <td>정해영(우)</td>
                                <td>.300</td>
                                <td>.250</td>
                                <td>.200</td>
                                <td>.200</td>
                                <td>2.10</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* main - button area 2 */}
            <div className={styles.buttonArea}>
                <button className={styles.choiceButton} onClick={() => moveSubPage('A')}>
                  <div className={styles.choiceLeft}>
                    <div className={styles.choiceBadge}>A</div>
                    <span>마운드 방문 후 이준영 유지</span>
                  </div>
                  <span className={styles.choiceArrow}>›</span>
                </button>
                <button className={styles.choiceButton} onClick={() => moveSubPage('B')}>
                  <div className={styles.choiceLeft}>
                    <div className={styles.choiceBadge}>B</div>
                    <span>투수 교체</span>
                  </div>
                  <span className={styles.choiceArrow}>›</span>
                </button>
                <button className={styles.choiceButton} onClick={() => moveSubPage('C')}>
                  <div className={styles.choiceLeft}>
                    <div className={styles.choiceBadge}>C</div>
                    <span>고의4구 → 김재환 승부</span>
                  </div>
                  <span className={styles.choiceArrow}>›</span>
                </button>
                <button className={styles.choiceButton} onClick={() => moveSubPage('D')}>
                  <div className={styles.choiceLeft}>
                    <div className={styles.choiceBadge}>D</div>
                    <span>수비 강화</span>
                  </div>
                  <span className={styles.choiceArrow}>›</span>
                </button>
            </div>
        </main>

        {/* footer */}
        <Footer/>
    </div>
  );
}