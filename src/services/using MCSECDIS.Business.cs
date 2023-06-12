using MCSECDIS.Business.Configuration;
using MCSECDIS.Business.Helper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Threading;
using RSV.WorkstationsManager.GrpcCommon;
using RSV.WorkstationsManager.GrpcCommon.Models;
using RSV.WorkstationsManager.SystemClient;
using static System.Environment;

namespace MCSECDIS.UI
{
    /// <summary>
    /// Interaction logic for App.xaml
    /// </summary>
    public partial class App : Application
    {
        private void Application_Startup(object sender, StartupEventArgs e)
        {
            //if (e.Args.Length<0)
            //    return;
            DispatcherUnhandledException += new DispatcherUnhandledExceptionEventHandler(Application_ThreadException);
            AppDomain.CurrentDomain.UnhandledException +=
                new UnhandledExceptionEventHandler(CurrentDomain_UnhandledException);
            InitiateConfiguration();
            MainWindow dockableMainWindow;

            if (e.Args.Length < 1)
            {
                dockableMainWindow = new MainWindow();
                dockableMainWindow.Show();
            }
            else if (e.Args.Length < 2)
            {
                MessageBox.Show("Please open from Home Screen");
                System.Windows.Application.Current.Dispatcher.Invoke(() =>
                {
                    Current.Shutdown();
                });
                return;
            }
            else if (e.Args.Length > 3)
            {
                dockableMainWindow = new MainWindow(e.Args[3].Replace("\n", String.Empty));
                dockableMainWindow.Show();
            }
            else
            {
                dockableMainWindow = new MainWindow();
                dockableMainWindow.Show();
            }
            var serverData = new ServerData(e.Args[0].Replace("\n", String.Empty), Convert.ToInt32(e.Args[1]), false);
            var systemClient = new SystemClient(serverData, "MCSECDIS.UI");
            systemClient.StartConnection();
            systemClient.CommandsObserver.Subscribe(command =>
            {
                if (command is { CommandDataCase: Command.CommandDataOneofCase.Close })
                {
                    System.Windows.Application.Current.Dispatcher.Invoke(() =>
                    {
                        Current.MainWindow.Close();
                        Current.Shutdown();
                    });
                }
                if (command is { CommandDataCase: Command.CommandDataOneofCase.SaveProfile })
                {
                    this.Dispatcher.Invoke(() =>
                    {
                        ((MCSECDIS.UI.ViewModels.MainViewModel)dockableMainWindow.DataContext).SaveProfile(command.SaveProfile);
                    });
                }
                if (command is { CommandDataCase: Command.CommandDataOneofCase.LoadProfile })
                {
                    this.Dispatcher.Invoke(() =>
                    {
                        ((MCSECDIS.UI.ViewModels.MainViewModel)dockableMainWindow.DataContext).LoadProfile(command.LoadProfile);
                    });
                }

            });


        }
        private void CurrentDomain_UnhandledException(object sender, UnhandledExceptionEventArgs e)
        {
            LogUnhandledException((Exception)e.ExceptionObject, "AppDomain.CurrentDomain.UnhandledException");
        }
        private void Application_ThreadException(object sender, DispatcherUnhandledExceptionEventArgs e)
        {
            LogUnhandledException(e.Exception, "Application.Current.DispatcherUnhandledException");
            e.Handled = true; //Do this otherwise your app will shut down
        }
        private void LogUnhandledException(Exception exception, string source)
        {
            ExceptionHandlingWrapper.LogExceptionAndShowMessage(exception);
            string errorMessage = string.Format($"Unhandled exception ({source})");
            MessageBox.Show(exception.Message, "Error", MessageBoxButton.OK, MessageBoxImage.Error);
        }
        private void InitiateConfiguration()
        {
            Esri.ArcGISRuntime.Hydrography.EncEnvironmentSettings.Default.SencDataPath = ECDISConfigruation.Instance.ProfileSettings.ENCSettings.SENCPath;
            Esri.ArcGISRuntime.ArcGISRuntimeEnvironment.ApiKey = ECDISConfigruation.Instance.ProfileSettings.ENCSettings.EsriKey;
        }
    }
}
