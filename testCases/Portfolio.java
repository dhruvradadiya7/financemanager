import static org.junit.Assert.*;

import org.junit.*;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;

public class Portfolio {
	private static WebElement email, password, submit;  
	private static ChromeDriver driver;
	
	@BeforeClass
	public static void beforeAll() throws InterruptedException {
		System.setProperty("webdriver.chrome.driver", "/Users/rajnish/Documents/Codes/test/chromedriver100");
		driver= new ChromeDriver();
		driver.get("https://fm-cegep.vercel.app/");
		Thread.sleep(3000);
		email = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div/div[2]/div/div[2]/div[1]/input"));
		password = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div/div[2]/div/div[2]/div[2]/input"));
		submit = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div/div[2]/div/div[2]/button"));
		email.sendKeys("testuser2@gmail.com");
		password.sendKeys("test123");
		submit.click();
		Thread.sleep(3000);
		driver.navigate().to("https://fm-cegep.vercel.app/portfolio");
	}

	@Test
	public void test1() throws InterruptedException {
		Thread.sleep(3000);
		WebElement stockOption = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[2]/div[4]/div[1]"));
		Actions actions = new Actions(driver);
		actions.moveToElement(stockOption).perform();
		WebElement addBtn = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[2]/div[4]/div[1]/button"));
		Assert.assertNotEquals(addBtn.getCssValue("width"), 0);
	}
	
	@Test
	public void test2() throws InterruptedException {
		WebElement addBtn = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[2]/div[4]/div[1]/button"));
		addBtn.click();
		Thread.sleep(3000);
		WebElement submitBtn = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[2]/div[5]/div/div[2]/button[2]"));
		submitBtn.click();
		checkMessage("Please enter amount or number of shares!");
	}
	
	@Test
	public void test3() throws InterruptedException {
		WebElement amount = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[2]/div[5]/div/div[1]/div[1]/input"));
		amount.clear();
		amount.sendKeys("3");
		WebElement submitBtn = driver.findElement(By.xpath("//*[@id=\"__next\"]/div/div[2]/div[5]/div/div[2]/button[2]"));
		submitBtn.click(); 
		checkMessage("Stock successfully added into your portfolio !");
	}
	
	public void checkMessage(String message) throws InterruptedException {
		Thread.sleep(2000);
		WebElement msgEle = driver.findElement(By.xpath("//*[@id=\"alert-message-fm\"]"));
		String msgText = msgEle.getText();
		System.out.print(msgText);
		Assert.assertEquals(message, msgText);
	}
	
	@AfterClass
	public static void afterClass() {
		driver.close();
	}
}
