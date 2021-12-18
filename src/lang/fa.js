export default {
  fa: {
    components: {
      calendarApp: {
        tabs: {
          0: 'میزکار',
          1: 'کتابخانه',
        },
      },
      table: {
        columns: {
          title: 'عنوان',
          type: 'نوع',
          color: 'رنگ',
          priority: 'اهمیت',
          difficulty: 'سختی',
          actions: 'امکانات',
          tasksCount: 'تعداد تسک‌ها',
        },
      },
      wiki: {
        wikiBooks: {
          title: 'دانشنامه کتاب‌ها',
          add: 'ثبت کتاب جدید',
          edit: {
            title: 'ویرایش کتاب با شناسه {0}',
            apply: 'اعمال تغییرات',
            topics: {
              add: 'ثبت سرفصل جدید',
              apply: 'اعمال تغییرات',
              edit: {
                title: 'ویرایش سرفصل',
                apply: 'اعمال تغییرات',
              },
              labels: {
                title: 'عنوان سرفصل',
                index: 'اندیس',
              },
            },
          },
          labels: {
            title: 'عنوان کتاب',
            color: 'رنگ',
            topics: 'سرفصل ها',
          },
        },
      },
      timeRemainingCard: {
        today: 'امروز {0}',
        progress: '{0} روز مانده',
      },
      kanboard: {
        columns: {
          todo: 'در صف',
          running: 'در حال انجام',
          done: 'انجام شد',
        },
        addNewTask: 'ثبت تسک جدید در backlog',
        selectTask: 'انتخاب تسک از backlog',
        taskSelect: {
          title: 'انتخاب تسک از backlog',
          apply: 'ثبت',
        },
      },
      progressChart: {
        title: 'برنامه هفتگی',
        form: {
          edit: 'جزییات روز {0}',
        },
        settings: {
          title: 'تنظیمات گزارش برنامه هفتگی',
          between: 'بازه زمانی گزارش',
          apply: 'اعمال تغییرات',
        },
      },
      sprintChart: {
        manage: 'مدیریت Sprintها',
        add: {
          title: 'ثبت Sprint جدید',
          apply: 'ارسال و ثبت',
        },
        edit: {
          title: 'ویرایش Sprint',
          apply: 'اعمال تغییرات',
        },
        remove: 'حذف این Sprint',
        labels: {
          title: 'عنوان این Sprint',
          between: 'بازه فعال بودن Sprint',
          description: 'توضیحات',
          color: 'رنگ نمایش',
          tasks: 'تسک‌ها',
        },
        activeDuration: '{0} روز مدت این Sprint',
        sprintDetails: 'از {0} به مدت {1} روز',
        sprintRemaining: '{0} روز مانده',
        noActive: 'امروز Sprint فعال ندارید',
      },
      calendarAppbar: {
        title: 'برنامه ریزی تحصیلی',
      },
      taskChart: {
        title: 'تسک‌ها',
        summary: 'از {0} تسک، {1} تسک در حال اجرا و {2} تسک باقی مانده',
        manage: 'مدیریت تسک‌ها',
        minutes: '{0} دقیقه',
        add: {
          title: 'ثبت تسک جدید',
          apply: 'ارسال و ثبت',
        },
        edit: {
          title: 'ویرایش تسک',
          apply: 'اعمال تغییرات',
        },
        remove: 'حذف این تسک',
        labels: {
          title: 'عنوان این تسک',
          description: 'توضیحات',
          color: 'رنگ نمایش',
          priority: 'درجه اهمیت',
          type: 'نوع تسک',
          difficulty: 'درجه سختی',
          status: 'وضعیت',
          sprint: 'Sprint',
          topics: 'سرفصل های مرتبط',
          books: 'کتابهای مرتبط',
          estimatedMinutes: 'مدت زمان به دقیقه',
        },
        priorities: {
          1: 'کم اهمیت',
          2: 'عادی',
          3: 'مهم',
          4: 'بسیار مهم',
        },
        types: {
          1: 'کوچک',
          2: 'متوسط',
          3: 'بزرگ',
        },
        status: {
          backlog: 'backlog',
          sprint: 'sprint',
          running: 'running',
          done: 'done',
        },
      },
    },
  },
}
