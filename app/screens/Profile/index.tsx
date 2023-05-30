import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useStyle } from './styles';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

const Profile: React.FC = () => {
  const styles = useStyle();
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Chooser')}>
        <Text style={styles.title}>{t('Create user')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
