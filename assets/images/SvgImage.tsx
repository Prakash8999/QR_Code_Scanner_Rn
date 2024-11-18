import React, { useRef, useEffect } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import Svg, { Path, Circle, G, Rect, Defs, ClipPath, LinearGradient, Stop } from "react-native-svg";

export const QrSvg = ({ width, height }: { width?: string, height?: string }) => {
	const animatedValue = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		// Loop the animation up and down
		Animated.loop(
			Animated.sequence([
				Animated.timing(animatedValue, {
					toValue: 1,
					duration: 2000,
					useNativeDriver: false,
				}),
				Animated.timing(animatedValue, {
					toValue: 0,
					duration: 2000,
					useNativeDriver: false,
				}),
			])
		).start();
	}, [animatedValue]);

	// Interpolate the animated value to move the line from top to bottom of the QR code
	const translateY = animatedValue.interpolate({
		inputRange: [0, 1],
		outputRange: [-90, 90],  // Adjust values to control line movement range
	});

	return (
		<View>
			<Svg width={width} height={height} viewBox="0 0 200 200" fill="none">
				<G clipPath="url(#clip0_4_1006)">
					<Path d="M0 6.25C0 4.5924 0.65848 3.00269 1.83058 1.83058C3.00269 0.65848 4.5924 0 6.25 0L43.75 0C45.4076 0 46.9973 0.65848 48.1694 1.83058C49.3415 3.00269 50 4.5924 50 6.25C50 7.9076 49.3415 9.49732 48.1694 10.6694C46.9973 11.8415 45.4076 12.5 43.75 12.5H33.5C21.902 12.5 12.5 21.902 12.5 33.5V43.75C12.5 45.4076 11.8415 46.9973 10.6694 48.1694C9.49732 49.3415 7.9076 50 6.25 50C4.5924 50 3.00269 49.3415 1.83058 48.1694C0.65848 46.9973 0 45.4076 0 43.75V6.25ZM150 6.25C150 4.5924 150.658 3.00269 151.831 1.83058C153.003 0.65848 154.592 0 156.25 0L193.75 0C195.408 0 196.997 0.65848 198.169 1.83058C199.342 3.00269 200 4.5924 200 6.25V43.75C200 45.4076 199.342 46.9973 198.169 48.1694C196.997 49.3415 195.408 50 193.75 50C192.092 50 190.503 49.3415 189.331 48.1694C188.158 46.9973 187.5 45.4076 187.5 43.75V33.5C187.5 21.902 178.098 12.5 166.5 12.5H156.25C154.592 12.5 153.003 11.8415 151.831 10.6694C150.658 9.49732 150 7.9076 150 6.25ZM6.25 150C7.9076 150 9.49732 150.658 10.6694 151.831C11.8415 153.003 12.5 154.592 12.5 156.25V166.5C12.5 178.098 21.902 187.5 33.5 187.5H43.75C45.4076 187.5 46.9973 188.158 48.1694 189.331C49.3415 190.503 50 192.092 50 193.75C50 195.408 49.3415 196.997 48.1694 198.169C46.9973 199.342 45.4076 200 43.75 200H6.25C4.5924 200 3.00269 199.342 1.83058 198.169C0.65848 196.997 0 195.408 0 193.75V156.25C0 154.592 0.65848 153.003 1.83058 151.831C3.00269 150.658 4.5924 150 6.25 150ZM193.75 150C195.408 150 196.997 150.658 198.169 151.831C199.342 153.003 200 154.592 200 156.25V193.75C200 195.408 199.342 196.997 198.169 198.169C196.997 199.342 195.408 200 193.75 200H156.25C154.592 200 153.003 199.342 151.831 198.169C150.658 196.997 150 195.408 150 193.75C150 192.092 150.658 190.503 151.831 189.331C153.003 188.158 154.592 187.5 156.25 187.5H166.5C178.098 187.5 187.5 178.098 187.5 166.5V156.25C187.5 154.592 188.158 153.003 189.331 151.831C190.503 150.658 192.092 150 193.75 150ZM50 56.25C50 52.7982 52.7982 50 56.25 50C59.7018 50 62.5 52.7982 62.5 56.25C62.5 59.7018 59.7018 62.5 56.25 62.5C52.7982 62.5 50 59.7018 50 56.25Z" fill="#FDB623" />
					<Path d="M87.5 25H25V87.5H87.5V25ZM37.5 37.5H75V75H37.5V37.5ZM62.5 137.5H50V150H62.5V137.5Z" fill="white" />
					<Path d="M87.5 112.5H25V175H87.5V112.5ZM37.5 125H75V162.5H37.5V125ZM137.5 50H150V62.5H137.5V50Z" fill="white" />
					<Path d="M112.5 25H175V87.5H112.5V25ZM125 37.5V75H162.5V37.5H125ZM100 100V125H112.5V137.5H100V150H125V125H137.5V150H150V137.5H175V125H137.5V100H100ZM125 125H112.5V112.5H125V125ZM175 150H162.5V162.5H137.5V175H175V150ZM125 175V162.5H100V175H125Z" fill="white" />
					<Path d="M150 112.5H175V100H150V112.5Z" fill="white" />
					<Circle cx="56.1111" cy="56.1111" r="7.22222" fill="white" />
					{/* Animated line */}
					{/* <Animated.View style={{ transform: [{ translateY }] }}> */}
					<Path d="M3.88892 100L197.778 98.3334" stroke="#FDB623" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
					{/* </Animated.View> */}
				</G>
				<Defs>
					<ClipPath id="clip0_4_1006">
						<Rect width="200" height="200" fill="white" />
					</ClipPath>
				</Defs>
			</Svg>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},
});


export const QrCodeLogo = () => {
	return (
		<Svg
			width={100}
			height={100}
			viewBox="0 0 112 112"
			fill="none"


		>
			<G filter="url(#filter0_d_4_820)">
				<Rect x={21} y={21} width={70} height={70} rx={35} fill="#FDB623" />
				<G clipPath="url(#clip0_4_820)">
					<Path
						d="M36 37.25A1.25 1.25 0 0137.25 36h7.5a1.25 1.25 0 010 2.5 6.25 6.25 0 00-6.25 6.25 1.25 1.25 0 01-2.5 0v-7.5zm30 0A1.25 1.25 0 0167.25 36h7.5A1.25 1.25 0 0176 37.25v7.5a1.25 1.25 0 01-2.5 0 6.25 6.25 0 00-6.25-6.25A1.25 1.25 0 0166 37.25zM37.25 66a1.25 1.25 0 011.25 1.25 6.25 6.25 0 006.25 6.25 1.25 1.25 0 010 2.5h-7.5A1.25 1.25 0 0136 74.75v-7.5A1.25 1.25 0 0137.25 66zm37.5 0A1.25 1.25 0 0176 67.25v7.5A1.25 1.25 0 0174.75 76h-7.5a1.25 1.25 0 010-2.5 6.25 6.25 0 006.25-6.25A1.25 1.25 0 0174.75 66zM46 47.25a1.25 1.25 0 112.5 0 1.25 1.25 0 01-2.5 0z"
						fill="#333"
					/>
					<Path
						d="M53.5 41H41v12.5h12.5V41zm-10 2.5H51V51h-7.5v-7.5zm5 20H46V66h2.5v-2.5z"
						fill="#fff"
					/>
					<Path
						d="M53.5 58.5H41V71h12.5V58.5zm-10 2.5H51v7.5h-7.5V61zm20-15H66v2.5h-2.5V46z"
						fill="#fff"
					/>
					<Path
						d="M58.5 41H71v12.5H58.5V41zm2.5 2.5V51h7.5v-7.5H61zM56 56v5h2.5v2.5H56V66h5v-5h2.5v5H66v-2.5h5V61h-7.5v-5H56zm5 5h-2.5v-2.5H61V61zm10 5h-2.5v2.5h-5V71H71v-5zm-10 5v-2.5h-5V71h5z"
						fill="#fff"
					/>
					<Path d="M66 58.5h5V56h-5v2.5z" fill="#fff" />
					<Circle cx={47.2222} cy={47.2222} r={1.44444} fill="#fff" />
					<Path
						d="M36.778 56l38.777-.333"
						stroke="#333"
						strokeWidth={2}
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</G>
			</G>
			<Defs>
				<ClipPath id="clip0_4_820">
					<Path fill="#fff" transform="translate(36 36)" d="M0 0H40V40H0z" />
				</ClipPath>
			</Defs>
		</Svg>
	)
}

interface QrBodyProps {
	style?: object; // For inline styles
	className?: string; // For Tailwind/NativeWind
	width?: string; // For Tailwind/NativeWind
	height?: string; // For Tailwind/NativeWind
}
export const QrBody: React.FC<QrBodyProps> = ({ style, className,width,height }) => {
	
	return (
		<Svg width="360" height="334"  viewBox="-23.5 0 390 353" fill="none" style={style} strokeWidth={3}>
			<G clip-path="url(#clip0_4_787)">
				<Path d="M0 10.9062C0 8.01373 1.12929 5.23969 3.13945 3.19437C5.1496 1.14905 7.87596 0 10.7188 0L75.0312 0C77.874 0 80.6004 1.14905 82.6105 3.19437C84.6207 5.23969 85.75 8.01373 85.75 10.9062C85.75 13.7988 84.6207 16.5728 82.6105 18.6181C80.6004 20.6635 77.874 21.8125 75.0312 21.8125H42.4375C30.8395 21.8125 21.4375 31.2145 21.4375 42.8125V76.3438C21.4375 79.2363 20.3082 82.0103 18.2981 84.0556C16.2879 86.101 13.5615 87.25 10.7188 87.25C7.87596 87.25 5.1496 86.101 3.13945 84.0556C1.12929 82.0103 0 79.2363 0 76.3438V10.9062ZM257.25 10.9062C257.25 8.01373 258.379 5.23969 260.389 3.19437C262.4 1.14905 265.126 0 267.969 0L332.281 0C335.124 0 337.85 1.14905 339.861 3.19437C341.871 5.23969 343 8.01373 343 10.9062V76.3438C343 79.2363 341.871 82.0103 339.861 84.0556C337.85 86.101 335.124 87.25 332.281 87.25C329.438 87.25 326.712 86.101 324.702 84.0556C322.692 82.0103 321.562 79.2363 321.562 76.3438V42.8125C321.562 31.2145 312.16 21.8125 300.562 21.8125H267.969C265.126 21.8125 262.4 20.6635 260.389 18.6181C258.379 16.5728 257.25 13.7988 257.25 10.9062ZM10.7188 261.75C13.5615 261.75 16.2879 262.899 18.2981 264.944C20.3082 266.99 21.4375 269.764 21.4375 272.656V306.188C21.4375 317.785 30.8395 327.188 42.4375 327.188H75.0312C77.874 327.188 80.6004 328.337 82.6105 330.382C84.6207 332.427 85.75 335.201 85.75 338.094C85.75 340.986 84.6207 343.76 82.6105 345.806C80.6004 347.851 77.874 349 75.0312 349H10.7188C7.87596 349 5.1496 347.851 3.13945 345.806C1.12929 343.76 0 340.986 0 338.094V272.656C0 269.764 1.12929 266.99 3.13945 264.944C5.1496 262.899 7.87596 261.75 10.7188 261.75ZM332.281 261.75C335.124 261.75 337.85 262.899 339.861 264.944C341.871 266.99 343 269.764 343 272.656V338.094C343 340.986 341.871 343.76 339.861 345.806C337.85 347.851 335.124 349 332.281 349H267.969C265.126 349 262.4 347.851 260.389 345.806C258.379 343.76 257.25 340.986 257.25 338.094C257.25 335.201 258.379 332.427 260.389 330.382C262.4 328.337 265.126 327.188 267.969 327.188H300.562C312.16 327.188 321.562 317.785 321.562 306.188V272.656C321.562 269.764 322.692 266.99 324.702 264.944C326.712 262.899 329.438 261.75 332.281 261.75ZM85.75 97.9688C85.75 92.049 90.549 87.25 96.4688 87.25C102.389 87.25 107.188 92.049 107.188 97.9688V98.3438C107.188 104.264 102.389 109.062 96.4688 109.062C90.549 109.062 85.75 104.264 85.75 98.3438V97.9688Z" fill="#FDB623" />
				{/* <Animated.View style={{ transform: [{ translateY }] }}> */}
				<Path d="M6.66943 174.5L339.189 171.592" stroke="#FDB623" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" />
				{/* </Animated.View> */}
			</G>
			<Defs>
				<ClipPath id="clip0_4_787">
					<Rect width="343" height="349" fill="white" />
				</ClipPath>
			</Defs>
		</Svg>

	)
}