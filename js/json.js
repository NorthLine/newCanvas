var nodeList=
    {
        name: '本人',
        id:1,
        lv:100,
        sex:0,
        root:true,
        spouseArry:[
            {
                name:'配偶一',
                lv:100,
                id:2,
                sex:1,
                childrenArry:[
                    {
                        name:'子1',
                        lv:101,
                        sex:0,
                        id:21
                    }
                ]
            },
            {
                name:'配偶二',
                lv:100,
                sex:1,
                id:3
            }
        ],
        parentsArry:[
            {
                name:'父1',
                lv:99,
                sex:0,
                id:11,
                parentsArry:[
                    {
                        name:'父01',
                        lv:99,
                        sex:0,
                        id:1099911,
                        spouseArry:[
                            {
                                name:'配偶0一~',
                                lv:99,
                                sex:1,
                                id:1199911

                            }
                        ],
                    }
                ],
                spouseArry:[
                    {
                        name:'配偶一~',
                        lv:99,
                        sex:1,
                        id:111,
                        parentsArry:[
                            {
                                name:'父1',
                                lv:99,
                                sex:0,
                                id:1011,
                                spouseArry:[
                                    {
                                        name:'配偶一~',
                                        lv:99,
                                        sex:1,
                                        id:1111

                                    },
                                    {
                                        name:'配偶二·',
                                        lv:99,
                                        sex:1,
                                        id:1112
                                    }
                                ],
                            }
                        ],
                    },
                    {
                        name:'配偶二·',
                        lv:99,
                        sex:1,
                        id:112
                    }
                ],
            }
        ],
        childrenArry:[
            {
                name:'子1',
                lv:101,
                sex:0,
                id:221,
                spouseArry:[
                    {
                        name:'配偶一~',
                        lv:99,
                        sex:1,
                        id:11611

                    },
                    {
                        name:'配偶二·',
                        lv:99,
                        sex:1,
                        id:11412
                    }
                ],
            },
            {
                name:'女2',
                lv:101,
                sex:1,
                id:22133
            },
            {
                name:'子12',
                lv:101,
                sex:0,
                id:2212313123
            }
        ]
    }

