import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const SimpleAccordion = () => {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Lightweight 12-lead ECG viewer for MATLAB</Typography>
        </AccordionSummary>
        <Paper elevation = {3}>
        <AccordionDetails>
          <Typography>
            Abstract: Electrocardiograms (ECGs) provide time-varying measurements of the electrical activity of the heart. These signals can provide insights into underlying aspects of heart health and disease. Here we provide software for viewing 12-lead ECG files (in .txt format) in a form familiar to any clinician or ECG expert, facilitating manual measurements of intervals and amplitudes. An executable version of the software, without the need for Matlab installation, can be downloaded separately. The input file is a 10-second 12 lead ECG text file, the output from the Magellan ECG Research Workstation Software Version 2.0 (GE Marquette Medical Systems, USA).
          </Typography>
          <Typography sx={{marginTop : 5}}>
            Background: Electrocardiograms (ECGs) provide time-varying measurements of the electrical activity of the heart. These signals can provide insights into underlying aspects of heart health and disease. ECG waveforms are typically presented against a standardized background grid that allows features such as intervals and amplitudes to be easily interpreted. A number of ECG visualization tools are publicly available, several of which are available on PhysioNet [1-6]. However, these tools typically require significant set up and may be more feature heavy than needed for those seeking to simply view 12-lead ECGs.

            Clinical investigators are often able to export raw ECG signals as .txt files comprising a matrix of digits in columns and rows. These are not immediately straightforward to view and explore. To satisfy the requests of clinical investigators who would like to see ECGs in their favorite clinical 12-lead ECG presentation view, there is therefore a demand for a simple viewer to handle these .txt files.
          </Typography>
          <Box sx={{marginTop : 2}}>
            <Link href="https://physionet.org/static/published-projects/12-lead-ecg-viewer-matlab/lightweight-12-lead-ecg-viewer-for-matlab-1.0.0.zip" variant="body2" sx={{marginTop : 5}}>
                  Download
            </Link>
          </Box>
        </AccordionDetails>
        </Paper>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>A multi-camera and multimodal dataset for posture and gait analysis</Typography>
        </AccordionSummary>
        <Paper elevation = {3}>
        <AccordionDetails>
          <Typography>
            Abstract: Gait and posture analysis while using assisting robotic devices is of utmost importance to attain effective assistance. This work provides a multi-camera, multimodal, and detailed dataset for vision-based applications using a wheeled robotic walker equipped with a pair of affordable cameras. Depth data was acquired at 30 fps from a total of 14 healthy participants walking at 3 different gait speeds, across 3 different walking scenarios/paths at 3 different locations. Simultaneously, accurate skeleton joint data was recorded using an inertial-based commercial motion capture system that provides a reliable ground-truth for classical or novel (i.e., machine learning-based) vision-based applications. In total, the database contains approximately 166K frames of synchronized data, which amounts to 92 minutes of total recording time. This dataset may contribute to the development and evaluation of: i) classic or data-driven vision-based pose estimation algorithms; ii) applications in human detection and tracking, and movement forecasting; iii) and gait/posture metrics analysis using a rehabilitation device.
          </Typography>
          <Typography sx={{marginTop : 5}}>
            Background: Gait and posture disabilities are a common form of disability. These may result in a lack of stability, affected motor coordination, poor balance, and muscle weakness, leading to an increased risk of falls and fall-related injuries [1]. Consequently, quality of life is highly jeopardized, causing social-economic consequences due to the increased institutionalization and dependence on others [2,3].

            Robotics-based rehabilitation is an evolving area that aims to improve the quality of life of motor-impaired persons by providing residual motor skills recovery based on repetitive and intensity-adapted training along with assistive devices [1]. To provide a more user-centered approach by designing rehabilitation therapies considering each person’s disability level, gait and posture analysis is relevant. Current solutions are based on expensive systems, namely optical motion capture systems (e.g. Vicon, Qualisys), that require complex setups along with specific environments and workspaces. Locomotion analysis using low-cost equipment, e.g. Kinect SDK (Microsoft Corporation, USA), has been presented in the literature [4]; however, this solution is prone to errors especially when dealing with non-trivial poses, rapid movements, or challenging light conditions. Additionally, the foot joints present instability and high error, making it unsuitable for gait analysis. [5,6].

            Recent studies involving vision-based machine learning techniques are showing great potential for locomotion analysis. Besides being a low-cost solution, evidence shows reasonable precision on estimating the person’s pose without the need of wearable markers/sensors nor complex setups [7]. Nevertheless, this approach requires a considerable amount of quality data to train the models and achieve the precision and accuracy required to be an effective locomotion analysis tool.

            Current available datasets of gait and posture analysis, present data that do not correspond to the real-world settings [8]. Most datasets that present accurate 3D joint data, usually obtained with on-body visual markers, are captured in laboratory context, within controlled environments [9,10,11,12]. Furthermore, most datasets do not provide camera-related data together with 3D joint coordinates obtained with standard motion tracker systems [13]. Those that provide camera-related data, namely depth recordings, have joint data that is captured with the Kinect SDK (Microsoft Corporation, USA) which is prone to errors and not robust to environmental conditions [11,12].

            To address these challenges, this dataset presents multi-camera vision data involving 14 healthy subjects walking with a robotic walker. The dataset includes raw inertial data, segments’ position, orientation, acceleration and angular velocity, and joint angles, measured with the commercially available Xsens MTw Awinda motion capture system [14], and depth frames of gait (GC) and posture (PC), captured with the walker's embedded cameras [3].
          </Typography>
          <Box sx={{marginTop : 2}}>
            <Link href="https://physionet.org/static/published-projects/multi-gait-posture/a-multi-camera-and-multimodal-dataset-for-posture-and-gait-analysis-1.0.0.zip" variant="body2" sx={{marginTop : 5}}>
                  Download
            </Link>
          </Box>
        </AccordionDetails>
        </Paper>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Treadmill Maximal Exercise Tests from the Exercise Physiology and Human Performance Lab of the University of Malaga</Typography>
        </AccordionSummary>
        <Paper elevation = {3}>
        <AccordionDetails>
          <Typography>
            Abstract: The present database is an ensemble of the cardiorespiratory measurements acquired during 992 treadmill maximal graded exercise tests (GET) performed in the Exercise Physiology and Human Performance Lab of the University of Malaga. Heart rate, oxygen consumption, carbon dioxide generation, and pulmonary ventilation are measured on a breath-to-breath basis along with the treadmill speed during maximal effort tests. Participants are amateur and professional athletes are of ages ranging from 10 to 63 years old. The age, height, and weight of the participants are provided, as well as the temperature and humidity during the test.
          </Typography>
          <Typography sx={{marginTop : 5}}>
           Background: Cardiac and respiratory data measured during graded exercise tests are key measures to calculate several cardio-respiratory indices used in sport science [1] and medicine [2,3]. All the parts of the oxygen consumption and heart rate dynamics during a GET are of interest: the rate of increase at exercise onset [4], the slope during exercise [5,6], the maximal values [7,8], the dynamics changes at ventilatory thresholds [9,10], the nonlinear dynamics during effort [11–13], and finally the dynamics during recovery [14,15]. The study of each of these segments of the oxygen consumption or heart rate dynamics during effort has led to indices used to characterize and predict health, fitness, or performance, such as ventilatory thresholds, heart resting rate, rate of heart rate increase, deflection point of the performance curve, etc. But comparisons between existing calculation methods for these indices are lacking, and reproducibility of the calculation is sometimes hindered by the lack of available open-source code. The goal of this dataset is then two-fold: To facilitate the publication and diffusion of calculation methods and associated code to analyze cardiorespiratory measurements of maximal exercise tests; To encourage studies comparing different calculation methods of indices derived from the cardio-respiratory measurements acquired during effort tests, such as ventilatory thresholds or heart rate recovery.
          </Typography>
          <Box sx={{marginTop : 2}}>
            <Link href="https://physionet.org/static/published-projects/treadmill-exercise-cardioresp/treadmill-maximal-exercise-tests-from-the-exercise-physiology-and-human-performance-lab-of-the-university-of-malaga-1.0.1.zip" variant="body2" sx={{marginTop : 5}}>
                  Download
            </Link>
          </Box>
        </AccordionDetails>
        </Paper>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Tai Chi, Physiological Complexity, and Healthy Aging - Gait</Typography>
        </AccordionSummary>
        <Paper elevation = {3}>
        <AccordionDetails>
          <Typography>
            Abstract: This dataset contains gait and electromyography (EMG) data collected during a hybrid study that included a two-arm randomized clinical trial (RCT) along with an additional observational comparison group. The RCT arm investigated the short-term effects of a Tai Chi intervention on 60 Tai Chi healthy naïve subjects, aged 50-79 years, living within the Greater Boston area, and reporting no regular Tai Chi practice within the past 5 years. Subjects were either randomized to 6 months of Tai Chi or usual care. Subjects came in for a baseline visit along with 3 month and 6 month follow-ups. The observational comparison group consisted of 27 healthy Tai Chi experts, aged 50-79 years, currently engaged in an active Tai Chi training regimen, each with at least 5 years of Tai Chi experience. The expert group was tested only at their baseline visit. The gait and EMG data were simultaneously recorded during walking at the subjects preferred speed for 10 minutes under the single-task condition and for 90 seconds under the dual-task condition. Our aim for this study was to use gait and EMG data to gain a better understanding of the mobility changes associated with Tai Chi training.
          </Typography>
          <Typography sx={{marginTop : 5}}>
           Background: Previous studies have shown the beneficial effects of Tai Chi on falls [1-4], balance [1, 5-8], and gait [9-11]. Some evidence suggests that the beneficial effect of Tai Chi on mobility may be more pronounced under cognitive dual-task conditions, such as performing serial subtractions while walking [11-12].

          Gait stride time variability (calculated from stride to stride intervals) and speed are established measures of mobility health [13-15].  Complexity based metrics such as detrended fluctuation analysis have shown promise for assessing mobility health but have not been widely used to assess changes in gait due to Tai Chi training [16-17]. The collection of 10 minutes of gait data (under the single-task condition) is enough for the computation of detrended fluctuation analysis which can reveal long-term memory effects across the span of hundreds of strides [16].

          Additionally, few studies have investigated the muscle activation patterns associated with Tai Chi training in an effort to understand the mechanisms behind Tai Chi’s effects on mobility. Muscle co-contraction measured using electromyography (EMG), and defined as the simultaneous activation of agonist and antagonist muscle groups, can serve as an informative clinical marker of mobility health [18]. The data from this project allows for exploration of whether co-contraction of muscle groups in the lower extremities may be an underlying mechanism associated with mobility improvements from Tai Chi training.
          </Typography>
          <Box sx={{marginTop : 2}}>
            <Link href="https://physionet.org/static/published-projects/taichidb/tai-chi-physiological-complexity-and-healthy-aging-gait-1.0.2.zip" variant="body2" sx={{marginTop : 5}}>
                  Download
            </Link>
          </Box>
        </AccordionDetails>
        </Paper>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>The CirCor DigiScope Phonocardiogram Dataset</Typography>
        </AccordionSummary>
        <Paper elevation = {3}>
        <AccordionDetails>
          <Typography>
            Abstract: A total number of 5272 heart sound recordings were collected from the main four auscultation locations of 1568 subjects, aged between 0 and 21 years (mean ± STD = 6.1 ± 4.1 years), with a duration between 4.8 to 80.4 seconds (mean ± STD = 22.9 ± 7.4 s), totaling more than 33.5 hours of recording. Each cardiac murmur in the dataset has been annotated in detail by a human annotator, in terms of timing, shape, pitch, grading, quality and location. Moreover, segmentation annotations regarding the location of fundamental heart sounds (S1 and S2) in the recordings have been obtained using a semi-supervised scheme. The segmentation annotations were performed by voting between three state-of-the-art machine-based algorithms. An expert annotator later studied the consensus and mismatches between the algorithms beat-by-beat and performed a manual annotation whenever the algorithms had disagreed or were not acceptable for the expert. To date, the dataset is the largest publicly available pediatric heart sound dataset, supporting deeper research on the topic of auscultation-based health recommendation systems. The dataset is being used in the George B. Moody PhysioNet Challenge 2022 on Heart Murmur Detection from Phonocardiogram Recordings.
          </Typography>
          <Typography sx={{marginTop : 5}}>
           Background: Fundamental heart sounds (namely S1 and S2) are generated from vibrations of the cardiac valves as they open and close during the cardiac cycle. Valve malfunctioning causes turbulence in the blood flow within heart chambers and near the heart, which translates into abnormal sounds known as murmurs. The analysis of murmurs provides invaluable information regarding the functioning status of heart valves.  The anatomical position of heart valves relative to the chest wall dictates the optimal auscultation position. As such, for clinical auscultations of each heart valve, the stethoscope is ideally placed at specific locations: 

            Aortic valve: second intercostal space, right sternal border
            Pulmonic valve: second intercostal space, left sternal border
            Tricuspid valve: left lower sternal border
            Mitral valve: fifth intercostal space, midclavicular line (cardiac apex)
            Blood flowing through these structures creates audible sounds, which are more audible the more turbulent the flow is [1]. The first heart sound (S1) is produced by vibrations of the mitral and tricuspid valves as they close in at the beginning of the systole. S1 is audible at the chest wall and is formed by two components – the mitral and tricuspid [1]. Although the mitral component of S1 is louder and occurs sooner, under physiological resting conditions, both components occur closely enough, making it hard to distinguish them [2]. The second heart sound (S2) is produced by the closure of the aortic and pulmonic valves, at the beginning of the diastole. Similarly to the S1, it is also formed by two components, with the aortic component being louder and occurring sooner than the pulmonic component, due to the pressures in the aorta being higher than in the pulmonary artery. In contrast and unlike S1, under normal conditions the closure sound of the aortic and pulmonic valves can be discernible, due to an increase in venous return during inspiration, which slightly delays the pressure increase in the pulmonary artery and consequently the pulmonic valve closure [3].
          </Typography>
          <Box sx={{marginTop : 2}}>
            <Link href="https://physionet.org/static/published-projects/taichidb/tai-chi-physiological-complexity-and-healthy-aging-gait-1.0.2.zip" variant="body2" sx={{marginTop : 5}}>
                  Download
            </Link>
          </Box>
        </AccordionDetails>
        </Paper>
      </Accordion>
    </div>
  );
}

export default SimpleAccordion