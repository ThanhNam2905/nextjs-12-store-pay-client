import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { BsChevronDown, BsFillCaretDownFill } from 'react-icons/bs';
import styles from './styles.module.scss';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<BsFillCaretDownFill size={16} fill='#999' />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1.5),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function ProductDetails({ details }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className={styles.accordion}>
            <Accordion
                expanded={expanded === 'panel1'}
                onChange={handleChange('panel1')}
                className={styles.accordion__wrapper}
            >
                <AccordionSummary
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    className={styles.accordion__wrapper__summary}
                >
                    <Typography sx={{ width: '33%', flexShrink: 0, fontSize: '16px' }}>
                        Thông tin chi tiết
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className={styles.accordion__wrapper__grid}>
                        <div>
                            <span>Tên sản phẩm: </span>
                            <span>{details[0]}</span>
                        </div>
                    </div>
                </AccordionDetails>
                <AccordionDetails>
                    { details.slice(1, details.length).map((info, index) => (
                        <div
                            key={index}
                            className={styles.accordion__wrapper__grid}
                        >
                            <span>{info.name}:</span>
                            <span>{info.value}.</span>
                        </div>
                    ))
                    }
                </AccordionDetails>
            </Accordion>
            <Accordion 
                expanded={expanded === 'panel2'} 
                onChange={handleChange('panel2')}
                className={styles.accordion__wrapper}
            >
                <AccordionSummary
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                    className={styles.accordion__wrapper__summary}
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        Kích thước sản phẩm
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className={styles.accordion__wrapper__grid}>
                        Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
                        varius pulvinar diam eros in elit. Pellentesque convallis laoreet
                        laoreet.
                    </div>          
                </AccordionDetails>
            </Accordion>
        </div>
    );
}