import React from 'react'
import {TouchableOpacity,Text} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons.js'
import styles from './Button.style.js'
const Button = ({label,icon,onPress,oval = false,additionalStyles}) => {
    return (
        <TouchableOpacity
            activeOpacity={.7}
            onPress={onPress}
            style={[
                styles.container,
                additionalStyles.container,
                oval && {borderRadius: 24}
            ]}
        >
            {icon && (
                <Icon name={icon.name} size={icon.size} color={icon.color} style={styles.icon}/>
            )}
            <Text style={[styles.label,additionalStyles.label]}>
                {label}
            </Text>
        </TouchableOpacity>
    )
}
export default Button