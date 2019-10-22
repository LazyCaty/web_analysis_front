import React, { Component } from 'react'
import styles from './WorldMap.module.css'
import 'echarts/lib/chart/map';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/visualMap';
import 'echarts/lib/component/axis';
import 'echarts/map/js/world';
import echarts from 'echarts/lib/echarts'
import ReactEcharts from 'echarts-for-react';
import { Form, } from 'antd';
import {getData} from '../../redux/action/worldMap'
import {connect} from 'react-redux'

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            countryData : [],
            avgData: [],
        }
    }

    componentDidMount(){
        this.props.dispatch(getData({
            country: 'avg'
        })).then(() => {
            if(this.props.worldMap.getData.length > 0){
                this.setState({
                    avgData: this.props.worldMap.getData[0].data.website
                })
            }
        })
    }
    /**
     * 世界地图配置
     */
    getOption =()=> {
        let option = {
            title: {
                text: '请选择您要查看数据的国家',
                left: 'center',
                textStyle: {
                    color: '#999FE0',
                    fontSize: 14
                }
            },
            // 缩放漫游组件，仅对地图有效
            roamController: {
                // 显示策略，可选为：true（显示） | false（隐藏）
                show: false,
                // 水平安放位置，默认为左侧，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
                x: 'right',
                // 垂直安放位置，默认为全图顶端，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
                y: 'top',
                // 指定宽度，决定4向漫游圆盘大小，可指定 {number}（宽度，单位px）
                width: 120,
                // 指定高度，缩放控制键默认会在指定高度的最下方最大化显示，可指定 {number}（高度，单位px）
                height: 200,
                // 缩放漫游组件背景颜色，默认透明
/*                 backgroundColor: 'rgba(0,0,0,0.1)',
                // 缩放漫游组件边框颜色
                borderColor: '#1e90ff',
                // 缩放漫游组件边框线宽，单位px，默认为0（无边框） */
                borderWidth: 1,
                // 缩放漫游组件内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距，同css
                padding: [15, 15, 15, 15],
                // 漫游组件文字填充颜色
                fillerColor: '#000',
                // 控制手柄主体颜色
                handleColor: '#e3655a',
                // 4向漫游移动步伐，单位px
                step: 10,
                // 必须，指定漫游组件可控地图类型
                mapTypeControl: {
                    world: true
                }
            },
            series: [
                {
                    // 图表类型，必要参数！如为空或不支持类型，则该系列数据不被显示。可选为：
                    // 'line'（折线图） | 'bar'（柱状图） | 'scatter'（散点图） | 'k'（K线图）
                    // 'pie'（饼图） | 'radar'（雷达图） | 'chord'（和弦图） | 'force'（力导向布局图） | 'map'（地图）
                    type: 'map',
                    // 系列名称
                    name: '国家名称',
                    // 地图类型，支持world，china及全国34个省市自治区
                    mapType: 'world',
                    // 是否开启滚轮缩放和拖拽漫游,默认为false（关闭），
                    // 其他有效输入为true（开启），'scale'（仅开启滚轮缩放），
                    // 'move'（仅开启拖拽漫游）
                    roam: true,
                    //显示地图红点
                    showLegendSymbol: false,
                    // 图形样式
                    itemStyle: {
                        // 默认状态下地图的文字
                        normal: {
                            label: { show: false },
                            borderWidth: 0.5, // 区域边框宽度
                            borderColor: '#505050', // 区域边框颜色
                            areaColor: '#818181', // 区域颜色
                        },
                        // 鼠标放到地图上面显示文字
                        emphasis: {
                            label: {
                                show: true,
                                color: '#FFFFFF'
                            },
                            areaColor: '#B5B5B5',
                        }
                    },
                }
            ]
        }
       return option
      }
    /**
     * 散点图配置 
     */  
    
    getOptionTwo =(data,avg)=> {
        let schema = [
            {name: 'website', index: 4, text: '网站名称'},
            {name: 'rank', index: 3, text: '当地网站排名'},
            {name: 'security', index: 2, text: '网站安全性'},
            {name: 'heat', index: 1, text: '网站流量热度'},
            {name: 'social', index: 0, text: '网站社交活跃度'},
        ];
        let itemStyle = {
            normal: {
                opacity: 0.8,
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        };
        let option = {
            color: [
                '#69CE34','#dd4444', '#fec42c', '#80F1BE','#7C00D2'
            ],
            legend: {
                y: 'top',
                data: ['top 1-10','top 11-20','top 21-30', 'top 31-40', 'top 41-50'],
                textStyle: {
                    color: '#fff',
                    fontSize: 13
                }
            },
            grid: {

                x2: 100,
                y2: '10%'
            },
            tooltip: {
                padding: 10,
                backgroundColor: '#222',
                borderColor: '#777',
                borderWidth: 1,
                formatter: function (obj) {
                    let value = obj.value;
                    return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 14px;padding-bottom: 7px;margin-bottom: 7px">'
                        + schema[0].text + ':  ' + value[4]
                        + '</div>'
                        + '<div style=" font-size: 12px; float:left">'
                        + schema[1].text + '：' + value[3] 
                        + '</div>' + '<br>'
                        + '<div style=" font-size: 12px; float:left">'
                        + schema[2].text + '：' + value[2]
                        + '</div>' + '<br>'
                        + '<div style=" font-size: 12px; float:left">'
                        + schema[3].text + '：' + value[1].toFixed(2)
                        + '</div>' + '<br>'
                        + '<div style=" font-size: 12px; float:left">'
                        + schema[4].text + '：' + value[0].toFixed(2)
                        + '</div>' + '<br>'
                }
            },
            xAxis: {
                name: 'log10(社交活跃度)',
                nameTextStyle: {
                    fontSize: 15,
                },
                min: 0,
                max: 8,
                type: 'value',
                nameLocation:'middle', 
                nameGap: 35,
                boundaryGap: [0, 0],
                axisLine: {
                    lineStyle: {
                        color: '#ffffff'
                    }
                },
                splitLine: {
                    show: false
                },
            },
            yAxis: {
                name: 'log10(网站热度)',
                nameTextStyle: {
                    fontSize: 15,
                },
                min: 0,
                max: 8,
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: '#ffffff'
                    }
                },
                splitLine: {
                    show: false
                },
            },

            visualMap: [
                {
                    left: '78%',
                    top: '10%',
                    dimension: 2,
                    min: 0,
                    max: 5,
                    itemWidth: 30,
                    itemHeight: 120,
                    calculable: true,
                    precision: 0.1,
                    text: ['圆形大小：网站安全性'],
                    textGap: 30,
                    textStyle: {
                        color: '#fff'
                    },
                    inRange: {
                        symbolSize: [10, 40]
                    },
                    outOfRange: {
                        symbolSize: [10, 40],
                        color: ['rgba(255,255,255,.2)']
                    },
                    controller: {
                        inRange: {
                            color: ['#c23531']
                        },

                    }
                },
                {
                    left: '78%',
                    bottom: '10%',
                    dimension: 3,
                    min: 0,
                    max: 10,
                    itemHeight: 120,
                    calculable: true,
                    precision: 0.1,
                    text: ['明暗：当地流量排名'],
                    textGap: 30,
                    textStyle: {
                        color: '#fff'
                    },
                    inRange: {
                        colorLightness: [1, 0.5]
                    },

                    controller: {
                        inRange: {
                            color: ['#c23531']
                        },

                    }
                }
            ],
            series: [{
                    name: 'top 1-10',
                    type: 'scatter',
                    itemStyle: itemStyle,
                    data: data[0],
                    markLine: {
                        silent: true,
                        symbol: ['none', 'none'],
                        lineStyle: {
                          normal: {
                            color: '#fffff'                   // 这儿设置安全基线颜色
                          }
                        },
                        data: [
                            {yAxis: Math.log10(avg[1])},
                            {xAxis:Math.log10(avg[0])}
                        ],
                    },
                },
                {
                    name: 'top 11-20',
                    type: 'scatter',
                    itemStyle: itemStyle,
                    data: data[1],
                    markLine: {
                        silent: true,
                        symbol: ['none', 'none'],
                        lineStyle: {
                          normal: {
                            color: '#fffff'                   // 这儿设置安全基线颜色
                          }
                        },
                        data: [
                            {yAxis: Math.log10(avg[1])},
                            {xAxis:Math.log10(avg[0])}
                        ],
                    },
                },
                {
                    name: 'top 21-30',
                    type: 'scatter',
                    itemStyle: itemStyle,
                    data: data[2],
                    markLine: {
                        silent: true,
                        symbol: ['none', 'none'],
                        lineStyle: {
                          normal: {
                            color: '#fffff'                   // 这儿设置安全基线颜色
                          }
                        },
                        data: [
                            {yAxis: Math.log10(avg[1])},
                            {xAxis:Math.log10(avg[0])}
                        ],
                    },
                },
                {
                    name: 'top 31-40',
                    type: 'scatter',
                    itemStyle: itemStyle,
                    data: data[3],
                    markLine: {
                        silent: true,
                        symbol: ['none', 'none'],
                        lineStyle: {
                          normal: {
                            color: '#fffff'                   // 这儿设置安全基线颜色
                          }
                        },
                        data: [
                            {yAxis: Math.log10(avg[1])},
                            {xAxis:Math.log10(avg[0])}
                        ],
                    },
                },
                {
                    name: 'top 41-50',
                    type: 'scatter',
                    itemStyle: itemStyle,
                    data: data[4],
                    markLine: {
                        silent: true,
                        symbol: ['none', 'none'],
                        lineStyle: {
                          normal: {
                            color: '#fffff'                   // 这儿设置安全基线颜色
                          }
                        },
                        data: [
                            {yAxis: Math.log10(avg[1])},
                            {xAxis:Math.log10(avg[0])}
                        ],
                    },
                },
            ]
        };
       return option
      }

    mapClick = (e) => {
        this.props.dispatch(getData({
            country:e.name
        })).then(() => {
            if(this.props.worldMap.getData.length > 0){
                this.setState({
                    countryData: this.props.worldMap.getData[0].data.website
                })
            }
        })
    }

    render() {
        let onClick = {
            'click': this.mapClick,
        }
        /**
         * 气泡图数据
         */
        let scatter ;
        let scatterData = [];
        let data = [];
        if(this.state.countryData.length > 0){
            for(let i = 0;i < this.state.countryData.length;i++){
                let item = [];
                item = [
                Math.log10(this.state.countryData[i].data.social_platform),
                Math.log10(this.state.countryData[i].data.website_heat),  
                this.state.countryData[i].data.website_security,
                (i + 1) % 10,
                this.state.countryData[i].website]
                data.push(item)
                if((i + 1) % 10 === 0){
                    scatterData.push(data);
                    data = [];
                }
            }
        /**
         * 平均值数据
         */
        let avgs = [this.state.avgData[0].data.social_platform,this.state.avgData[0].data.website_heat]
        scatter = <ReactEcharts option={this.getOptionTwo(scatterData,avgs)} style={{ width: '100%', height: '600px'}}/>
            
        }

        return (
            <div className={styles.container}>
                <div className={styles.top}><p>各国家流量排名前50的网站不同维度的可视化分析</p></div>
                <div className={styles.map}>
                    <ReactEcharts option={this.getOption()} style={{ width: '100%', height: '600px' }} onEvents={onClick}/>
                </div>
                <div className={styles.point}>
                    {scatter}
                </div>
            </div>
        )
    }
}

//组件和状态关联
const mapStateToProps = state =>{
    return {worldMap: state.worldMap}
}
Login = connect(mapStateToProps)(Login)

export default Form.create()(Login)
