import { useState } from 'react';
import {
    Box,
    IconButton,
    InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery,
    Input,
} from '@mui/material'; // maknio input
import { Search, Message, DarkMode, LightMode, Notifications, Help, Menu, Close } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux'; // fali useSelector
import { setMode, setLogout } from 'state';
import { useNavigate } from 'react-router-dom';
import FlexBetween from 'components/FlexBetween';

const Navbar = () => {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false); // prikaz izbornika na mobile ekranima, on off
    const dispatch = useDispatch(); // dispatching actions from reducers !
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const isNonMobileScreens = useMediaQuery('(min-width: 1000px)'); // umjesto da pisemo u css

    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light; // dohvacamo iz nase palete
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;

    const fullName = `${user.firstName} ${user.lastName}`;

    return (
        <FlexBetween
            padding="1rem 6%"
            backgroundColor={alt}
        >
            <FlexBetween gap="1.75rem">
                <Typography
                    fontWeight="bold"
                    fontSize="clamp(1rem, 2rem, 2.25rem)"
                    color="primary"
                    onClick={() => navigate('/home')}
                    sx={{
                        '&:hover': {
                            color: primaryLight,
                            cursor: 'pointer',
                        },
                    }}
                >
                    Fipugram
                </Typography>
                {isNonMobileScreens && (
                    <FlexBetween
                        backgroundColor={neutralLight}
                        borderRadius="9px"
                        gap="3rem"
                        padding="0.1rem 1.5rem"
                    >
                        <InputBase placeholder="Search..." />
                        <IconButton>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                )}
                {/* ako je mobile screen necemo ga prikazati */}
            </FlexBetween>

            {/* DESKTOP NAV, navigacija za non mobile screens */}
            {isNonMobileScreens ? (
                <FlexBetween gap="2rem">
                    <IconButton onClick={() => dispatch(setMode())}>
                        {/* Button za light/dark mod, change light u dark u state/index.js */}
                        {theme.palette.mode === 'dark' ? (
                            <DarkMode sx={{ fontSize: '25px' }} />
                        ) : (
                            <LightMode sx={{ color: dark, fontSize: '25px' }} />
                        )}
                    </IconButton>
                    <Message sx={{ fontSize: '25px' }} />
                    <Notifications sx={{ fontSize: '25px' }} />
                    <Help sx={{ fontSize: '25px' }} />
                    {/* TOP RIGHT DROPDOWN, vidimo korisnika i logout button */}
                    <FormControl
                        variant="standard"
                        value={fullName}
                    >
                        <Select
                            value={fullName}
                            sx={{
                                backgroundColor: neutralLight,
                                width: '150px',
                                borderRadius: '0.25rem',
                                p: '0.25rem 1rem',
                                '& .MuiSvgIcon-root': {
                                    pr: '0.25rem',
                                    width: '3rem',
                                },
                                '& .MuiSelect-select:focus': {
                                    backgroundColor: neutralLight,
                                },
                            }}
                            input={<InputBase />}
                        >
                            <MenuItem value={fullName}>
                                <Typography>{fullName}</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
                        </Select>
                    </FormControl>
                </FlexBetween>
            ) : (
                <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                    {/* OKRENI VRIJEDNOST */}
                    <Menu />
                </IconButton>
            )}

            {/* MOBILE NAVIGACIJA */}
            {!isNonMobileScreens && isMobileMenuToggled && (
                <Box
                    position="fixed"
                    right="0"
                    bottom="0"
                    height="100%"
                    zIndex="10"
                    maxWidth="500px"
                    minWidth="300px"
                    backgroundColor={background}
                >
                    {/* CLOSE IKONA */}
                    <Box
                        display="flex"
                        justifyContent="flex-end"
                        p="1rem"
                    >
                        <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                            <Close />
                        </IconButton>
                    </Box>

                    {/* MENU ITEMS */}
                    <FlexBetween
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        gap="3rem"
                    >
                        <IconButton
                            onClick={() => dispatch(setMode())}
                            sx={{ fontSize: '25px' }}
                        >
                            {/* Button za light/dark mod, change light u dark u state/index.js */}
                            {theme.palette.mode === 'dark' ? (
                                <DarkMode sx={{ fontSize: '25px' }} />
                            ) : (
                                <LightMode sx={{ color: dark, fontSize: '25px' }} />
                            )}
                        </IconButton>
                        <Message sx={{ fontSize: '25px' }} />
                        <Notifications sx={{ fontSize: '25px' }} />
                        <Help sx={{ fontSize: '25px' }} />
                        {/* TOP RIGHT DROPDOWN, vidimo korisnika i logout button */}
                        <FormControl
                            variant="standard"
                            value={fullName}
                        >
                            <Select
                                value={fullName}
                                sx={{
                                    backgroundColor: neutralLight,
                                    width: '150px',
                                    borderRadius: '0.25rem',
                                    p: '0.25rem 1rem',
                                    '& .MuiSvgIcon-root': {
                                        pr: '0.25rem',
                                        width: '3rem',
                                    },
                                    '& .MuiSelect-select:focus': {
                                        backgroundColor: neutralLight,
                                    },
                                }}
                                input={<InputBase />}
                            >
                                <MenuItem value={fullName}>
                                    <Typography>{fullName}</Typography>
                                </MenuItem>
                                <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
                            </Select>
                        </FormControl>
                    </FlexBetween>
                </Box>
            )}
        </FlexBetween>
    ); // mozemo pisati samo ovako kao string jer smo definirali flexbetween kao styled(box)
};

export default Navbar;
