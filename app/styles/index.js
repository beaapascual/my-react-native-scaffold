import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

export const colors = {
    textBase: '#585858',
    textSecondary: '#8E98A7',

    textMedium: '#464646',
    textLight: '#8E98A7',

    brand: '#592BE0',
    brandRed: '#D23D3D',

    grayBackground: '#F8F8F9',
    inputBase: 'rgba(255, 233, 212, 0.6)',
    inputTint: '#fff',
    error: '#DD1A1A',
    errorContainer: '#cc4125',
};

export const fontSizes = {
    base: 14,
    medium: 16,
    heading: 18,
};

export const pageContainer = {
    flex: 1,
    backgroundColor: '#fff',
};

export const scrollContainer = {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
};

export const scrollContentContainer = {
    paddingBottom: 10,
    width: width - 25,
    minHeight: height - 120,
};

export const rowContainer = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
};

export const errorContainer = {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
};

export const shadow = {
    shadowColor: 'rgba(0,0,0, .3)',
    shadowOffset: { height: 2, width: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    backgroundColor: '#fff',
    elevation: 1,
};

export const topLeftIcon = {
    position: 'absolute',
    top: 20,
    left: 15,
};

export const avatar = {
    width: 100,
    height: 100,
    borderRadius: 50,
};

export const avatarMedium = {
    width: 70,
    height: 70,
    borderRadius: 35,
};

export const avatarSmall = {
    width: 40,
    height: 40,
    borderRadius: 20,
};

export const backgroundImage = {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
    height: null,
};

export const buttons = {
    primary: {
        backgroundColor: '#19d860',
    },
    text: {
        color: colors.textBase,
        fontSize: fontSizes.base,
    },
};

export const inputIcon = {
    width: 30,
    height: 30,
    resizeMode: 'contain',
};

export const buttonRightIcon = {
    position: 'absolute',
    right: 20,
};

export const activityIndicator = {
    marginTop: 80,
};

export const windowSpacing = 15;

export const textfieldHeight = 72;

export const textEmpty = {
    paddingTop: 10,
    fontSize: 14,
    color: colors.textSecondary,
};

export const fullWidth = width;
export const fullHeight = height;
