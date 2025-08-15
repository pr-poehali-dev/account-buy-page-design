import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Account {
  id: string;
  platform: string;
  price: number;
  quantity: number;
  region: string;
  level?: number;
  features: string[];
}

interface Purchase {
  id: string;
  account: Account;
  timestamp: Date;
  status: 'completed' | 'pending' | 'active';
}

const Index = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  const countries = [
    { code: 'US', name: 'США', flag: '🇺🇸', accounts: 245 },
    { code: 'GB', name: 'Великобритания', flag: '🇬🇧', accounts: 189 },
    { code: 'DE', name: 'Германия', flag: '🇩🇪', accounts: 167 },
    { code: 'FR', name: 'Франция', flag: '🇫🇷', accounts: 134 },
    { code: 'CA', name: 'Канада', flag: '🇨🇦', accounts: 98 },
    { code: 'AU', name: 'Австралия', flag: '🇦🇺', accounts: 76 },
  ];

  const accounts: Account[] = [
    {
      id: '1',
      platform: 'Instagram',
      price: 25.99,
      quantity: 12,
      region: selectedCountry || 'US',
      level: 85,
      features: ['Верифицированный', '10k+ подписчиков', 'Активные посты']
    },
    {
      id: '2',
      platform: 'TikTok',
      price: 18.50,
      quantity: 8,
      region: selectedCountry || 'US',
      level: 92,
      features: ['Креативный фонд', '50k+ подписчиков', 'Высокий ER']
    },
    {
      id: '3',
      platform: 'YouTube',
      price: 45.00,
      quantity: 5,
      region: selectedCountry || 'US',
      level: 78,
      features: ['Монетизация', '100k+ подписчиков', 'Стрим ключ']
    },
    {
      id: '4',
      platform: 'Twitter',
      price: 12.99,
      quantity: 15,
      region: selectedCountry || 'US',
      level: 67,
      features: ['Blue подписка', '5k+ подписчиков', 'Активность']
    },
  ];

  const purchases: Purchase[] = [
    {
      id: '1',
      account: accounts[0],
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      status: 'active'
    },
    {
      id: '2',
      account: accounts[1],
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      status: 'completed'
    },
    {
      id: '3',
      account: accounts[2],
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      status: 'completed'
    },
  ];

  const activePurchase = purchases.find(p => p.status === 'active');
  const recentPurchases = purchases.filter(p => p.status === 'completed').slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center">
                <Icon name="ShoppingCart" size={20} className="text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Account Store
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                Онлайн: 1,247
              </Badge>
              <Button variant="outline" size="sm">
                <Icon name="User" size={16} className="mr-2" />
                Профиль
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* Countries Section */}
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Icon name="Globe" size={24} className="text-primary" />
                <span>Выберите страну</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {countries.map((country) => (
                  <Button
                    key={country.code}
                    variant={selectedCountry === country.code ? "default" : "outline"}
                    className={`h-auto p-4 flex flex-col items-center space-y-2 transition-all duration-200 hover:scale-105 ${
                      selectedCountry === country.code 
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' 
                        : 'hover:bg-primary/10 hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedCountry(country.code)}
                  >
                    <span className="text-2xl">{country.flag}</span>
                    <div className="text-center">
                      <div className="font-medium text-sm">{country.name}</div>
                      <div className="text-xs opacity-70">{country.accounts} аккаунтов</div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Accounts Section */}
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name="Package" size={24} className="text-primary" />
                  <span>Доступные аккаунты</span>
                  {selectedCountry && (
                    <Badge variant="secondary" className="ml-2">
                      {countries.find(c => c.code === selectedCountry)?.flag} {countries.find(c => c.code === selectedCountry)?.name}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Filter" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Сортировка: По цене</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {accounts.map((account) => (
                  <Card key={account.id} className="bg-muted/30 border-border/30 hover:bg-muted/50 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/10">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center">
                            <span className="text-lg font-bold text-primary-foreground">
                              {account.platform.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{account.platform}</h3>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <Icon name="MapPin" size={14} />
                              <span>{countries.find(c => c.code === account.region)?.name}</span>
                              {account.level && (
                                <>
                                  <span>•</span>
                                  <span>Уровень {account.level}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">${account.price}</div>
                          <div className="text-sm text-muted-foreground">
                            <Icon name="Package" size={12} className="inline mr-1" />
                            {account.quantity} шт.
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                          {account.features.map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                        
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25">
                          <Icon name="ShoppingCart" size={16} className="mr-2" />
                          Купить аккаунт
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          
          {/* Active Purchase */}
          {activePurchase && (
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-primary">
                  <Icon name="Activity" size={20} />
                  <span>Активная покупка</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <span className="font-bold text-primary">
                      {activePurchase.account.platform.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium">{activePurchase.account.platform}</div>
                    <div className="text-sm text-muted-foreground">${activePurchase.account.price}</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Статус</span>
                    <Badge className="bg-primary/20 text-primary">Обработка</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Время</span>
                    <span>30 мин назад</span>
                  </div>
                </div>
                
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full w-3/4 animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Purchases */}
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Icon name="History" size={20} className="text-primary" />
                <span>Последние покупки</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentPurchases.map((purchase) => (
                <div key={purchase.id} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">
                      {purchase.account.platform.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{purchase.account.platform}</div>
                    <div className="text-xs text-muted-foreground">
                      {purchase.timestamp.toLocaleDateString('ru-RU')}
                    </div>
                  </div>
                  <div className="text-sm font-medium text-primary">
                    ${purchase.account.price}
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full mt-4">
                <Icon name="MoreHorizontal" size={16} className="mr-2" />
                Показать все
              </Button>
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Icon name="BarChart3" size={20} className="text-primary" />
                <span>Статистика</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-primary">847</div>
                  <div className="text-xs text-muted-foreground">Всего аккаунтов</div>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold text-primary">124</div>
                  <div className="text-xs text-muted-foreground">Продано сегодня</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Instagram</span>
                  <span className="font-medium">34%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div className="bg-primary h-1.5 rounded-full w-[34%]"></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">TikTok</span>
                  <span className="font-medium">28%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div className="bg-primary h-1.5 rounded-full w-[28%]"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;